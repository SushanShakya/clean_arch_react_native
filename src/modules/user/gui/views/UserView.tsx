import { View } from "react-native"
import UserEntity from "../../domain/entities/UserEntity"
import { fetchUsersInteractor } from "../../domain/usecases/FetchUsersInteractor"
import UserBloc from "../presenters/UserBloc"
import { useState, useEffect } from "react"
import { BlocBuilder } from "warped_bloc_react"
import { defaultBuilder } from "../../../../core/state_management/DefaultBuilder"
import UserListingWidget from "../components/UserListingWidget"

export const UserView = () => {
    let [userBloc, _] = useState(new UserBloc(fetchUsersInteractor));

    useEffect(() => {
        userBloc.fetch();
    }, []);

    return (
        <View style={{
            paddingTop: 50,
        }}>
            <BlocBuilder
                bloc={userBloc}
                builder={defaultBuilder<UserEntity[], any>({
                    onData: (data: UserEntity[]) => {
                        return <UserListingWidget users={data} />
                    }
                })} />
        </View>
    )
}