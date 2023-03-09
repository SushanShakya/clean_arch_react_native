import { ReactElement } from "react";
import { DataState, ErrorState, LoadingState, StateChecker } from "warped_bloc_react"

export const defaultListener = <D, E>({
    onLoading,
    afterLoading,
    onError,
    onData,
    otherwise,
}: {
    onLoading?: Function,
    afterLoading?: Function,
    onError?: (state: ErrorState<E>) => ReactElement,
    onData?: (state: D) => ReactElement,
    otherwise?: Function,
}) => {
    return (state: any) => {
        if (StateChecker.isLoading(state)) {
            if (onLoading) {
                onLoading();
            } else {
            }
            return;
        }
        if (afterLoading) {
            afterLoading();
        }
        if (StateChecker.isError(state)) {
            if (onError) {
                onError(state as ErrorState<E>);
            } else {

            }
            return;
        }
        if (StateChecker.isData(state)) {
            if (onData) {
                onData((state as DataState<D>).data);
            } else {

            }
            return;
        }
        if (otherwise) {
            otherwise();
        }
    }
}