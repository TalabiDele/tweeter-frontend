import {createAsyncThunk, createSlice, PayloadAction} from '@reduxjs/toolkit'

export interface Values {
  firstName: string | null;
  surname: string | null;
  email: string;
  password: string;
  phoneNumber: number | null;
}

export interface LoginValues {
  identifier: string;
  password: string;
}

interface FetchedUser {
  jwt: string | null;
  user: Values | null
}

interface UserState {
  data: FetchedUser | null;
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: UserState = {
  data: null,
  loading: 'idle',
  error: null,
}

export const registerUser = createAsyncThunk('user/register', async (data: Values, thunkAPI) => {
  console.log(thunkAPI)

  const res = await fetch(`http://localhost:1337/api/auth/local/register?populate=*`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  const resData = await res.json()

  console.log(resData)

  return resData
})

export const loginUser = createAsyncThunk('user/login', async (data: LoginValues, thunkAPI) => {
  console.log(thunkAPI)

  const res = await fetch(`http://localhost:1337/api/auth/local?populate=*`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  const resData = await res.json()

  console.log(resData)

  return resData
})

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.loading = 'pending'
    }).addCase(registerUser.fulfilled, (state, action: PayloadAction<FetchedUser>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null;
    }).addCase(registerUser.rejected, (state, action: PayloadAction<string>) => {
      state.loading = 'failed';
      state.error = action.payload;
    }).addCase(loginUser.pending, (state) => {
      state.loading = 'pending'
    }).addCase(loginUser.fulfilled, (state, action: PayloadAction<FetchedUser>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null;
    }).addCase(loginUser.rejected, (state, action: PayloadAction<string>) => {
      state.loading = 'failed';
      state.error = action.payload;
    })
  },
})

export default userSlice.reducer;

