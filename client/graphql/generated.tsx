import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
  DateTime: any;
};

export type ProposalHollow = {
  __typename?: 'ProposalHollow';
  proposerId: Scalars['ID'];
  tenderId: Scalars['ID'];
  amount: Scalars['Int'];
  deliveredByVendor: Scalars['Boolean'];
};

export type Proposal = {
  __typename?: 'Proposal';
  proposerId: Scalars['ID'];
  tenderId: Scalars['ID'];
  amount: Scalars['Int'];
  deliveredByVendor: Scalars['Boolean'];
};

export type MaterialHollow = {
  __typename?: 'MaterialHollow';
  name: Scalars['ID'];
};

export type Material = {
  __typename?: 'Material';
  name: Scalars['ID'];
  usedForProducts: Array<Product>;
  heldAuctions: Array<Tender>;
};

export type ProductHollow = {
  __typename?: 'ProductHollow';
  creatorId: Scalars['ID'];
  materialName: Scalars['ID'];
};

export type Product = {
  __typename?: 'Product';
  creatorId: Scalars['ID'];
  materialName: Scalars['ID'];
  creator: Vendor;
  createdMaterial: Material;
};

export type Vendor = {
  __typename?: 'Vendor';
  userId: Scalars['ID'];
  companyName?: Maybe<Scalars['String']>;
  asUser: User;
  productsCreated: Array<Product>;
  submittedProposals: Array<Proposal>;
  acceptedAgreements: Array<Agreement>;
};

export type UserHollow = {
  __typename?: 'UserHollow';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
  accessToken: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  role: Scalars['String'];
  accessToken: Scalars['String'];
};

export type Manufacturer = {
  __typename?: 'Manufacturer';
  userId: Scalars['ID'];
  companyName: Scalars['String'];
  asUser: User;
  auctionsManaged: Array<Tender>;
};

export type TenderHollow = {
  __typename?: 'TenderHollow';
  tenderId: Scalars['ID'];
  managerId: Scalars['String'];
  materialName: Scalars['String'];
  description: Scalars['String'];
  startDate: Scalars['DateTime'];
  duration: Scalars['Int'];
  endDate: Scalars['DateTime'];
  agreementStartDate: Scalars['DateTime'];
  agreementDuration: Scalars['Int'];
};


export type Tender = {
  __typename?: 'Tender';
  tenderId: Scalars['ID'];
  managerId: Scalars['String'];
  materialName: Scalars['String'];
  description: Scalars['String'];
  startDate: Scalars['DateTime'];
  duration: Scalars['Int'];
  endDate: Scalars['DateTime'];
  agreementStartDate: Scalars['DateTime'];
  agreementDuration: Scalars['Int'];
  manager: Manufacturer;
  forMaterial: Material;
  proposals: Array<Proposal>;
};

export type AgreementHollow = {
  __typename?: 'AgreementHollow';
  tenderId: Scalars['ID'];
  vendorId: Scalars['ID'];
  startDate: Scalars['DateTime'];
  duration: Scalars['Int'];
  endDate: Scalars['DateTime'];
};

export type Agreement = {
  __typename?: 'Agreement';
  tenderId: Scalars['ID'];
  vendorId: Scalars['ID'];
  startDate: Scalars['DateTime'];
  duration: Scalars['Int'];
  endDate: Scalars['DateTime'];
};

export type Query = {
  __typename?: 'Query';
  getAllProducts: Array<Product>;
  getAllUsers: Array<User>;
  currentUser?: Maybe<User>;
  fetchManufacturer?: Maybe<Manufacturer>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createProduct: ProductHollow;
  login: UserHollow;
  registerManufacturer: UserHollow;
  registerVendor: UserHollow;
  createAgreement: AgreementHollow;
  createTender: TenderHollow;
  createProposal: ProposalHollow;
  createMaterial: MaterialHollow;
};


export type MutationCreateProductArgs = {
  product: ProductInput;
};


export type MutationLoginArgs = {
  login: UserLoginInput;
};


export type MutationRegisterManufacturerArgs = {
  user: UserInput;
  manufacturer: ManufacturerInput;
};


export type MutationRegisterVendorArgs = {
  user: UserInput;
  vendor: VendorInput;
};


export type MutationCreateAgreementArgs = {
  agreement: AgreementInput;
};


export type MutationCreateTenderArgs = {
  tender: TenderInput;
};


export type MutationCreateProposalArgs = {
  proposal: ProposalInput;
};


export type MutationCreateMaterialArgs = {
  material: MaterialInput;
};

export type ProductInput = {
  materialName: Scalars['String'];
};

export type UserLoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserInput = {
  email: Scalars['String'];
  password: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
};

export type ManufacturerInput = {
  companyName: Scalars['String'];
};

export type VendorInput = {
  companyName: Scalars['String'];
};

export type AgreementInput = {
  tenderId: Scalars['String'];
  vendorId: Scalars['String'];
  startDate: Scalars['DateTime'];
  duration: Scalars['Float'];
};

export type TenderInput = {
  startDate: Scalars['DateTime'];
  duration: Scalars['Float'];
  agreementStartDate: Scalars['DateTime'];
  agreementDuration: Scalars['Float'];
  materialName: Scalars['String'];
};

export type ProposalInput = {
  tenderId: Scalars['String'];
  amount: Scalars['Float'];
  deliveredByVendor: Scalars['Boolean'];
};

export type MaterialInput = {
  name: Scalars['String'];
};

export type LoginMutationVariables = Exact<{
  email: Scalars['String'];
  password: Scalars['String'];
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserHollow' }
    & Pick<UserHollow, 'id' | 'firstName' | 'lastName' | 'email' | 'role' | 'accessToken'>
  ) }
);

export type FetchManufacturerQueryVariables = Exact<{ [key: string]: never; }>;


export type FetchManufacturerQuery = (
  { __typename?: 'Query' }
  & { fetchManufacturer?: Maybe<(
    { __typename?: 'Manufacturer' }
    & Pick<Manufacturer, 'userId' | 'companyName'>
  )> }
);

export type GelAllProdctsQueryVariables = Exact<{ [key: string]: never; }>;


export type GelAllProdctsQuery = (
  { __typename?: 'Query' }
  & { getAllProducts: Array<(
    { __typename?: 'Product' }
    & Pick<Product, 'creatorId' | 'materialName'>
    & { creator: (
      { __typename?: 'Vendor' }
      & Pick<Vendor, 'userId'>
      & { asUser: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'firstName' | 'lastName' | 'email' | 'role'>
      ) }
    ) }
  )> }
);


export const LoginDocument = gql`
    mutation Login($email: String!, $password: String!) {
  login(login: {email: $email, password: $password}) {
    id
    firstName
    lastName
    email
    role
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const FetchManufacturerDocument = gql`
    query FetchManufacturer {
  fetchManufacturer {
    userId
    companyName
  }
}
    `;

/**
 * __useFetchManufacturerQuery__
 *
 * To run a query within a React component, call `useFetchManufacturerQuery` and pass it any options that fit your needs.
 * When your component renders, `useFetchManufacturerQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFetchManufacturerQuery({
 *   variables: {
 *   },
 * });
 */
export function useFetchManufacturerQuery(baseOptions?: Apollo.QueryHookOptions<FetchManufacturerQuery, FetchManufacturerQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<FetchManufacturerQuery, FetchManufacturerQueryVariables>(FetchManufacturerDocument, options);
      }
export function useFetchManufacturerLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<FetchManufacturerQuery, FetchManufacturerQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<FetchManufacturerQuery, FetchManufacturerQueryVariables>(FetchManufacturerDocument, options);
        }
export type FetchManufacturerQueryHookResult = ReturnType<typeof useFetchManufacturerQuery>;
export type FetchManufacturerLazyQueryHookResult = ReturnType<typeof useFetchManufacturerLazyQuery>;
export type FetchManufacturerQueryResult = Apollo.QueryResult<FetchManufacturerQuery, FetchManufacturerQueryVariables>;
export const GelAllProdctsDocument = gql`
    query GelAllProdcts {
  getAllProducts {
    creatorId
    materialName
    creator {
      userId
      asUser {
        id
        firstName
        lastName
        email
        role
      }
    }
  }
}
    `;

/**
 * __useGelAllProdctsQuery__
 *
 * To run a query within a React component, call `useGelAllProdctsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGelAllProdctsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGelAllProdctsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGelAllProdctsQuery(baseOptions?: Apollo.QueryHookOptions<GelAllProdctsQuery, GelAllProdctsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GelAllProdctsQuery, GelAllProdctsQueryVariables>(GelAllProdctsDocument, options);
      }
export function useGelAllProdctsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GelAllProdctsQuery, GelAllProdctsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GelAllProdctsQuery, GelAllProdctsQueryVariables>(GelAllProdctsDocument, options);
        }
export type GelAllProdctsQueryHookResult = ReturnType<typeof useGelAllProdctsQuery>;
export type GelAllProdctsLazyQueryHookResult = ReturnType<typeof useGelAllProdctsLazyQuery>;
export type GelAllProdctsQueryResult = Apollo.QueryResult<GelAllProdctsQuery, GelAllProdctsQueryVariables>;