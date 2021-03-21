import { useLoginMutation } from "graphql/generated"
import { NextPage } from "next"
import { useRouter } from "next/dist/client/router"
import { useState } from "react"
import styles from "../components/login.module.css"
import { IAppChildrenProps } from "./_app"

export interface ILogin extends IAppChildrenProps {}

const Login: NextPage<ILogin> = ({ currentUser, setCurrentUser }) => {
	const router = useRouter()

	const [login, { data, error }] = useLoginMutation()
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	console.log(data)
	console.log(error?.graphQLErrors)
	console.log(currentUser)

	return (
		<div className={styles.pageLogin}>
			<div className='ui centered grid container'>
				<div className='nine wide column'>
					<div className='ui icon warning message'>
						<i className='lock icon'></i>
						<div className='content'>
							<div className='header'>Login failed!</div>
							<p>You might have misspelled your username or password!</p>
						</div>
					</div>
					<div className='ui fluid card'>
						<div className='content'>
							<form
								className='ui form'
								method='POST'
								onSubmit={async e => {
									e.preventDefault()
									try {
										const res = await login({ variables: { email, password } })
										setCurrentUser(res.data!.login)
										router.push("/")
									} catch (err) {}
								}}
							>
								<div className='field'>
									<label>User</label>
									<input
										type='text'
										name='user'
										placeholder='User'
										onChange={event => setEmail((event.target as any).value)}
									/>
								</div>
								<div className='field'>
									<label>Password</label>
									<input
										type='password'
										name='pass'
										placeholder='Password'
										onChange={event => setPassword((event.target as any).value)}
									/>
								</div>
								<button className='ui primary labeled icon button' type='submit'>
									<i className='unlock alternate icon'></i>
									Login
								</button>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default Login
