import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { userSlice } from './features/userSlice';
import { alertControlSlice } from './features/alertControlSlice'
import { preventivoSlice } from './features/preventivoSlice';
import { prevInputCheck } from './features/prevInputCheck';
import { allprevSlice } from './features/allPrevSlice';



export const store = configureStore({
  reducer: {
   user: userSlice.reducer,
   alert: alertControlSlice.reducer,
   preventiveS: preventivoSlice.reducer,
   checkS : prevInputCheck.reducer,
   allPrevS : allprevSlice.reducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
