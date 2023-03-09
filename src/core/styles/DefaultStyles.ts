import { StyleSheet } from "react-native";

export default StyleSheet.create({
    expanded: {
        flex: 1
    },
    row: {
        flexDirection: "row"
    },
    column: {
        flexDirection: "column"
    },
    center: {
        justifyContent: "center",
        alignItems: "center"
    },
    titleStyle: {
        fontSize: 16,
        fontWeight: "600",
        color: "#000",
    },
    paddingHX: {
        paddingHorizontal: 24,
    },
    paddingH: {
        paddingHorizontal: 16,
    },
    paddingV: {
        paddingVertical: 16,
    },
    marginH: {
        marginHorizontal: 16,
    },
    marginV: {
        marginVertical: 16,
    },
    marginL: {
        marginLeft: 16,
    },
    marginT: {
        marginTop: 16,
    },
    marginR: {
        marginRight: 16,
    },
    marginB: {
        marginBottom: 16,
    },
    card: {
        borderWidth: 1,
        borderColor: "#000",
        borderRadius: 16
    },
    button: {
        height: 44,
        paddingH: 12,
        backgroundColor: "#ffaa11"
    },
    shadowStyle: {
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.38,
        shadowRadius: 10,
        elevation: 12,
    },
    spacerH: {
        width: "100%",
    },
    spacerV: {
        height: "100%",
    }
})