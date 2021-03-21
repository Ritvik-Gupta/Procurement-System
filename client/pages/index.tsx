import { NextPage } from "next"
import { IAppChildrenProps } from "./_app"

export interface IHomeProps extends IAppChildrenProps {}

const Home: NextPage<IHomeProps> = ({ currentUser }) => {
	return (
		<div>
			Name : {currentUser?.firstName} {currentUser?.lastName}
		</div>
	)
}

export default Home
