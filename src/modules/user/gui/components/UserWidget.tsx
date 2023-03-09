import UserEntity from "../../domain/entities/UserEntity";
import { View, Image, Text } from 'react-native'
import DefaultStyles from "../../../../core/styles/DefaultStyles";

const UserWidget = (param: {
    user: UserEntity
}) => {
    const { user } = param;
    return (
        <View style={[DefaultStyles.row, DefaultStyles.center, {
            paddingBottom: 10,
        }]}>
            <Image
                style={{
                    height: 50,
                    width: 50,
                    marginRight: 20
                }}
                source={{
                    uri: user.avatar,
                }} />
            <View style={DefaultStyles.expanded}>
                <Text style={{
                    color: "#000"
                }}>
                    {user.name}
                </Text>
            </View>
        </View>
    )
}

export default UserWidget