/* generated using @openapi-qraft/cli -- do no edit */
/* istanbul ignore file */
import { qraftAPIClient, QraftClientOptions } from "@openapi-qraft/react";
import { getInfiniteQueryData } from "@openapi-qraft/react/callbacks/getInfiniteQueryData";
import { getInfiniteQueryKey } from "@openapi-qraft/react/callbacks/getInfiniteQueryKey";
import { getMutationKey } from "@openapi-qraft/react/callbacks/getMutationKey";
import { getQueryData } from "@openapi-qraft/react/callbacks/getQueryData";
import { getQueriesData } from "@openapi-qraft/react/callbacks/getQueriesData";
import { getQueryKey } from "@openapi-qraft/react/callbacks/getQueryKey";
import { mutationFn } from "@openapi-qraft/react/callbacks/mutationFn";
import { queryFn } from "@openapi-qraft/react/callbacks/queryFn";
import { setInfiniteQueryData } from "@openapi-qraft/react/callbacks/setInfiniteQueryData";
import { setQueryData } from "@openapi-qraft/react/callbacks/setQueryData";
import { setQueriesData } from "@openapi-qraft/react/callbacks/setQueriesData";
import { useInfiniteQuery } from "@openapi-qraft/react/callbacks/useInfiniteQuery";
import { useMutation } from "@openapi-qraft/react/callbacks/useMutation";
import { useQuery } from "@openapi-qraft/react/callbacks/useQuery";
import { useSuspenseQuery } from "@openapi-qraft/react/callbacks/useSuspenseQuery";
import { useSuspenseInfiniteQuery } from "@openapi-qraft/react/callbacks/useSuspenseInfiniteQuery";
import { useMutationState } from "@openapi-qraft/react/callbacks/useMutationState";
import { useIsMutating } from "@openapi-qraft/react/callbacks/useIsMutating";
import { useQueries } from "@openapi-qraft/react/callbacks/useQueries";
import { useSuspenseQueries } from "@openapi-qraft/react/callbacks/useSuspenseQueries";
import { invalidateQueries } from "@openapi-qraft/react/callbacks/invalidateQueries";
import { cancelQueries } from "@openapi-qraft/react/callbacks/cancelQueries";
import { resetQueries } from "@openapi-qraft/react/callbacks/resetQueries";
import { removeQueries } from "@openapi-qraft/react/callbacks/removeQueries";
import { refetchQueries } from "@openapi-qraft/react/callbacks/refetchQueries";
import { isFetching } from "@openapi-qraft/react/callbacks/isFetching";
import { isMutating } from "@openapi-qraft/react/callbacks/isMutating";
import { useIsFetching } from "@openapi-qraft/react/callbacks/useIsFetching";
import { fetchQuery } from "@openapi-qraft/react/callbacks/fetchQuery";
import { prefetchQuery } from "@openapi-qraft/react/callbacks/prefetchQuery";
import { fetchInfiniteQuery } from "@openapi-qraft/react/callbacks/fetchInfiniteQuery";
import { prefetchInfiniteQuery } from "@openapi-qraft/react/callbacks/prefetchInfiniteQuery";
import { getQueryState } from "@openapi-qraft/react/callbacks/getQueryState";
import { getInfiniteQueryState } from "@openapi-qraft/react/callbacks/getInfiniteQueryState";
import { operationInvokeFn } from "@openapi-qraft/react/callbacks/operationInvokeFn";
import { services, Services } from "./services/index";
const callbacks = {
    getInfiniteQueryData,
    getInfiniteQueryKey,
    getMutationKey,
    getQueryData,
    getQueriesData,
    getQueryKey,
    mutationFn,
    queryFn,
    setInfiniteQueryData,
    setQueryData,
    setQueriesData,
    useInfiniteQuery,
    useMutation,
    useQuery,
    useSuspenseQuery,
    useSuspenseInfiniteQuery,
    useMutationState,
    useIsMutating,
    useQueries,
    useSuspenseQueries,
    invalidateQueries,
    cancelQueries,
    resetQueries,
    removeQueries,
    refetchQueries,
    isFetching,
    isMutating,
    useIsFetching,
    fetchQuery,
    prefetchQuery,
    fetchInfiniteQuery,
    prefetchInfiniteQuery,
    getQueryState,
    getInfiniteQueryState,
    operationInvokeFn
};
export function createAPIClient(options?: QraftClientOptions): Services {
    return qraftAPIClient<Services, typeof callbacks>(services, callbacks, options);
}
