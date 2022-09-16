import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Country = {
  __typename?: 'Country';
  code: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  countries?: Maybe<Array<Maybe<Country>>>;
  zipInformation?: Maybe<ZipInformation>;
};


export type QueryZipInformationArgs = {
  country: Scalars['String'];
  zipCode: Scalars['String'];
};

export type ZipInformation = {
  __typename?: 'ZipInformation';
  city: Scalars['String'];
  state: Scalars['String'];
};

export type ZipInformationQueryVariables = Exact<{
  country: Scalars['String'];
  zipCode: Scalars['String'];
}>;


export type ZipInformationQuery = { __typename?: 'Query', zipInformation?: { __typename?: 'ZipInformation', state: string, city: string } | null };

export type CountriesQueryVariables = Exact<{ [key: string]: never; }>;


export type CountriesQuery = { __typename?: 'Query', countries?: Array<{ __typename?: 'Country', name: string, code: string } | null> | null };


export const ZipInformationDocument = gql`
    query ZipInformation($country: String!, $zipCode: String!) {
  zipInformation(country: $country, zipCode: $zipCode) {
    state
    city
  }
}
    `;

/**
 * __useZipInformationQuery__
 *
 * To run a query within a React component, call `useZipInformationQuery` and pass it any options that fit your needs.
 * When your component renders, `useZipInformationQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useZipInformationQuery({
 *   variables: {
 *      country: // value for 'country'
 *      zipCode: // value for 'zipCode'
 *   },
 * });
 */
export function useZipInformationQuery(baseOptions: Apollo.QueryHookOptions<ZipInformationQuery, ZipInformationQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ZipInformationQuery, ZipInformationQueryVariables>(ZipInformationDocument, options);
      }
export function useZipInformationLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ZipInformationQuery, ZipInformationQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ZipInformationQuery, ZipInformationQueryVariables>(ZipInformationDocument, options);
        }
export type ZipInformationQueryHookResult = ReturnType<typeof useZipInformationQuery>;
export type ZipInformationLazyQueryHookResult = ReturnType<typeof useZipInformationLazyQuery>;
export type ZipInformationQueryResult = Apollo.QueryResult<ZipInformationQuery, ZipInformationQueryVariables>;
export function refetchZipInformationQuery(variables: ZipInformationQueryVariables) {
      return { query: ZipInformationDocument, variables: variables }
    }
export const CountriesDocument = gql`
    query countries {
  countries {
    name
    code
  }
}
    `;

/**
 * __useCountriesQuery__
 *
 * To run a query within a React component, call `useCountriesQuery` and pass it any options that fit your needs.
 * When your component renders, `useCountriesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCountriesQuery({
 *   variables: {
 *   },
 * });
 */
export function useCountriesQuery(baseOptions?: Apollo.QueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
      }
export function useCountriesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CountriesQuery, CountriesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CountriesQuery, CountriesQueryVariables>(CountriesDocument, options);
        }
export type CountriesQueryHookResult = ReturnType<typeof useCountriesQuery>;
export type CountriesLazyQueryHookResult = ReturnType<typeof useCountriesLazyQuery>;
export type CountriesQueryResult = Apollo.QueryResult<CountriesQuery, CountriesQueryVariables>;
export function refetchCountriesQuery(variables?: CountriesQueryVariables) {
      return { query: CountriesDocument, variables: variables }
    }