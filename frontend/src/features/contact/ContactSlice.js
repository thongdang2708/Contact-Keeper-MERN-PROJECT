
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import ContactService from "./ContactService";

const initialState = {
    contacts: [],
    contact: {},
    itemEdit: {
        item: {},
        edit: false
    },
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ""
};

export const addContact = createAsyncThunk("/contact/addContact",
        async (user, thunkAPI) => {
            try {

                let token = thunkAPI.getState().auth.user.token;

                return await ContactService.createContact(user, token);
               

            } catch (error) {
                
                let message = (error.response && error.response.data  && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);

            }
        } 
);

export const displayContacts = createAsyncThunk("/contact/displayContacts",
        async (user, thunkAPI) => {
            try {
                let token = thunkAPI.getState().auth.user.token;

                return await ContactService.getAllContacts(token);
            }  catch (error) {

                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

export const displayContact = createAsyncThunk("/contact/displayContact", 
        async (user, thunkAPI) => {
            try {

                let token = thunkAPI.getState().auth.user.token;

                return await ContactService.getSingleContact(user, token);


            } catch (error) {
                
                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

                return thunkAPI.rejectWithValue(message);
            }
        }
);

export const getEditItem = createAsyncThunk("/contact/getEditContact",
async (user, thunkAPI) => {
    try {

        let token = thunkAPI.getState().auth.user.token;

        return await ContactService.getSingleContact(user, token);


    } catch (error) {
        
        let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();

        return thunkAPI.rejectWithValue(message);
    }
}
);

export const updateForContact = createAsyncThunk("/contact/updateContact",
        async (user, thunkAPI) => {

           try {
               let token = thunkAPI.getState().auth.user.token;

               return await ContactService.updateContact(user.text, user.id, token);
           } catch (error) {
               
                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                
                return thunkAPI.rejectWithValue(message);
           }
        }
);

export const deleteForContact = createAsyncThunk("/contact/deleteContact",
        async (user, thunkAPI) => {

            try {

                let token = thunkAPI.getState().auth.user.token;

                return await ContactService.deleteContact(user, token);

            } catch (error) {
                let message = (error.response && error.response.data && error.response.data.message) || error.message || error.toString();
                
                return thunkAPI.rejectWithValue(message);
            }
        }
)


export const ContactSlice = createSlice({
    name: "contact",
    initialState,
    reducers: {
        resetFunction: (state) => initialState,
        resetSingle: (state) => {
            state.user = {}
        }
    },
    extraReducers: (builder) => {
       builder
            .addCase(addContact.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(addContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isSuccess = true;
            })
            .addCase(addContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(displayContacts.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(displayContacts.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = action.payload;
            })
            .addCase(displayContacts.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(displayContact.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(displayContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contact = action.payload;
            })
            .addCase(displayContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(getEditItem.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(getEditItem.fulfilled, (state, action) => {
                state.isLoading = false;
                state.itemEdit = {
                    item: action.payload,
                    edit: true
                }
            })
            .addCase(getEditItem.rejected, (state, action) => {
                state.isLoading = false;
                state.isError= true;
                state.message = action.payload;
            })
            .addCase(updateForContact.pending, (state, action) => {
                state.isLoading = true;
            })
            .addCase(updateForContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = state.contacts.map((contact) => contact._id === action.payload._id ? {...contact, ...action.payload} : contact);
            })
            .addCase(updateForContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
            .addCase(deleteForContact.pending, (state, action) => {
                state.isLoading = false;
            })
            .addCase(deleteForContact.fulfilled, (state, action) => {
                state.isLoading = false;
                state.contacts = state.contacts.filter((contact) => contact._id !== action.payload._id);
            })
            .addCase(deleteForContact.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.message = action.payload;
            })
    }
});

export const {resetFunction, resetSingle} = ContactSlice.actions;

export default ContactSlice.reducer;