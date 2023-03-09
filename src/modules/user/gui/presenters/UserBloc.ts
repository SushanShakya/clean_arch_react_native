import FetchUsersInteractor from "../../domain/usecases/FetchUsersInteractor"
import { AsyncCubit, DataState } from 'warped_bloc_react/src/index'

export default class UserBloc extends AsyncCubit {
    constructor(private fetchUsers: FetchUsersInteractor) {
        super();
    }

    async fetch() {
        this.handleDefaultStates(async () => {
            let users = await this.fetchUsers.call({});
            const names = users.map(e => e.name)
            this.emit(new DataState(users));
        });
    }
}