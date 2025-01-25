import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./slices";
import { administrationReducer } from "./slices/administrationSlice";
import { departmentsReducer } from "./slices/departmentSlice";

export const store = configureStore ({
    reducer: {
        adminstration: administrationReducer,
        departments: departmentsReducer,
        user: userReducer
    }
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;