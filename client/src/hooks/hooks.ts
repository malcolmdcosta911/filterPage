import {
  useDispatch,
  useSelector,
//   type TypedUseSelectorHook,
} from "react-redux";
import type { AppDispatch, RootState } from "../store/configureStore";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
