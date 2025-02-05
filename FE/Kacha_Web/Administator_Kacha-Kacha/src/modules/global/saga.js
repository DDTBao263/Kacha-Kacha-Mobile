import { put, takeLatest } from "redux-saga/effects";


function* getLengthCart() {
    try {
      const storedCartItems = localStorage.getItem("cartItems");
      const cartItems = storedCartItems ? JSON.parse(storedCartItems) : [];
      const lengthCart = cartItems.length;
  
      yield put(setLengthCart(lengthCart));
    } catch (error) {
      console.error("Error getting cart:", error);
    }
}

export function* watchEditorGlobalSaga() {
    yield takeLatest("getLengthCart", getLengthCart);
}  
