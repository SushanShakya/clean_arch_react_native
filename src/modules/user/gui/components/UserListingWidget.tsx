import UserEntity from "../../domain/entities/UserEntity";
import { View } from 'react-native'
import UserWidget from "./UserWidget";

interface UserListingWidgetParam {
    users: Array<UserEntity>
}

const UserListingWidget = (param: UserListingWidgetParam) => {
    const { users } = param;
    return (
        <View style={{
            padding: 20
        }}>
            {
                users.map((e, i) => (<UserWidget key={i} user={e} />))
            }
        </View>
    )
}

export default UserListingWidget