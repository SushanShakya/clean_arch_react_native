import { Text, View } from 'react-native'
import { ReactElement } from 'react'
import { StateChecker, ErrorState } from 'warped_bloc_react'

type DataFn<D> = (data: D) => ReactElement
type ErrorFn<E> = (state: ErrorState<E>) => ReactElement

export const defaultBuilder = <D, E>({
    onData,
    onError,
    onLoading,
    otherwise
}: {
    onData: DataFn<D>,
    onError?: ErrorFn<E>,
    onLoading?: Function,
    otherwise?: Function,
}) => {
    return (state: any) => {
        if (StateChecker.isLoading(state)) {
            if (onLoading) {
                return onLoading();
            }
            return (
                <Text>Loading</Text>
            )
        }
        if (StateChecker.isError(state)) {
            const error = (state as ErrorState<any>).message
            if (onError) {
                return onError(state as ErrorState<E>);
            }
            return (
                <Text>{error}</Text>
            )
        }

        if (StateChecker.isData(state)) {
            return onData(state.data as D)
        }

        if (otherwise) {
            return otherwise();
        }
        return (
            <View></View>
        )
    }
}