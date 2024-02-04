import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import Cookies from 'universal-cookie'
import { jwtDecode } from 'jwt-decode'

export interface Values {
  firstName: string | null;
  surname: string | null;
  email: string;
  password: string;
  phoneNumber: number | null;
}
export interface UserValues {
  firstName: string | null;
  surname: string | null;
  email: string;
  password: string;
  phoneNumber: number | null;
  id: number
  bio: string
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
  isAuthenticated: boolean
}

interface Token {
  name: string;
  exp: number;
}

const initialState: UserState = {
  data: null,
  loading: 'idle',
  error: null,
  isAuthenticated: false
}

const cookies = new Cookies()

// Register user
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

  const decoded = jwtDecode<Token>(resData.jwt)

  cookies.set('tweeter_auth', resData.jwt, {
    expires: new Date(decoded.exp * 1000),
  })

  console.log(resData)

  return resData
})

// Login user
export const loginUser = createAsyncThunk('user/login', async (data: LoginValues, thunkAPI) => {

  const res = await fetch(`http://localhost:1337/api/auth/local?populate=*`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })

  const resData = await res.json()

  const decoded = jwtDecode<Token>(resData.jwt)

  cookies.set('tweeter_auth', resData.jwt, {
    expires: new Date(decoded.exp * 1000)
  })

  console.log(resData)

  return resData
})

// Persist user after registration or login
export const checkUserLoggedIn = createAsyncThunk('user/getUser', async (thunkAPI) => {
  console.log(thunkAPI)

  const res = await fetch(`http://localhost:1337/api/users/me?populate=*`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${cookies.get('tweeter_auth')}`
    }
  })

  const resData = res.json()
  
  console.log(res)

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
    }).addCase(checkUserLoggedIn.pending, (state) => {
      state.loading = 'pending';
    }).addCase(checkUserLoggedIn.fulfilled, (state, action: PayloadAction<FetchedUser>) => {
      state.loading = 'succeeded';
      state.data = action.payload;
      state.error = null;
      state.isAuthenticated = true;
    }).addCase(checkUserLoggedIn.rejected, (state, action: PayloadAction<string>) => {
      state.loading = 'failed';
      state.error = action.payload;
      state.isAuthenticated = false;
    })
  },
})

export default userSlice.reducer;

