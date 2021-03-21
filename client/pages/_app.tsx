import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client"
import { NextPage } from "next"
import { AppProps } from "next/app"
import React, { Dispatch, SetStateAction, StrictMode, useState } from "react"
import "semantic-ui-css/semantic.min.css"

const client = new ApolloClient({
	cache: new InMemoryCache(),
	uri: "http://localhost:4000/graphql",
})

export interface ICurrentUser {
	id: string
	firstName: string
	lastName: string
	email: string
	role: string
	accessToken: string
}

export interface IAppChildrenProps {
	setCurrentUser: Dispatch<SetStateAction<ICurrentUser | undefined>>
	currentUser: ICurrentUser | undefined
}

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
	const [currentUser, setCurrentUser] = useState<ICurrentUser>()

	return (
		<ApolloProvider client={client}>
			<StrictMode>
				<Component {...pageProps} setCurrentUser={setCurrentUser} currentUser={currentUser} />
			</StrictMode>
		</ApolloProvider>
	)
}

export default App
