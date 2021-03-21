import { useFetchManufacturerQuery } from "graphql/generated"
import { IAppChildrenProps } from "pages/_app"

export interface IHomeProps extends IAppChildrenProps {}

export const Home = () => {
	const { data } = useFetchManufacturerQuery({})
	return <div>Company name : {data?.fetchManufacturer?.companyName}</div>
}
