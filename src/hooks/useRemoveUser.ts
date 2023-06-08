import { useAuthStorage } from "./useAuthStorage";
import { useApolloClient } from "@apollo/client";
import AuthStorage from "../utils/authStorage";

const useRemoveUser = () => {
    const authStorage = useAuthStorage() as AuthStorage;
    const client = useApolloClient();
    const removeUser = async () => {
        await authStorage.removeAccessToken();
        await client.resetStore();
    }
    return removeUser;
}

export default useRemoveUser;