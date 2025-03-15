import { createSlice } from "@reduxjs/toolkit"

let initialState = {
    service: null,
    currentScreen: null,
    previousScreen: null,
    isLoggedIn: false,
    isLoggedOut: true,
    profileData : null,
    pendingProfile: false | true,
    userProfile: null,
    featureFlags: null,
    helpAndSupportData: null,
    orderAddressId: null
}

export const navSlice = createSlice({
    name: 'nav',
    initialState,
    reducers: {
        setService: (state, action) => {
            state.service = action.payload;
        },
        setCurrentScreen: (state, action) => {
            state.currentScreen = action.payload
        },
        setPreviousScreen: (state, action) => {
            state.previousScreen = action.payload
        },
        setIsLoggedIn: (state, action) => {
            state.isLoggedIn = action.payload
        },
        setIsLoggedOut: (state, action) => {
            state.isLoggedOut = action.payload
        },
        setProfileData: (state, action) => {
            state.profileData = action.payload
        },
        setPendingProfile: (state, action) => {
            state.pendingProfile = action.payload;
        },
        setUserProfile : (state, action) => {
            state.userProfile = action.payload;
        },
        setFeatureFlags : (state, action) => {
            state.featureFlags = action.payload;
        },
        setHelpAndSupportData : (state, action) => {
            state.helpAndSupportData = action.payload;
        },
        setOrderAddressId : (state, action) => {
            state.orderAddressId = action.payload;
        }
    },
})

export const { setService, setHelpAndSupportData ,setFeatureFlags, setCurrentScreen, setPreviousScreen, setIsLoggedIn, setIsLoggedOut, setProfileData, setPendingProfile, setUserProfile, setOrderAddressId } = navSlice.actions;


// Selector
export const selectService = (state) => state.nav.service;
export const selectCurrentScreen = (state) => state.nav.currentScreen;
export const selectPreviousScreen = (state) => state.nav.previousScreen;
export const selectIsLoggedIn = (state) => state.nav.isLoggedIn;
export const selectIsLoggedOut = (state) => state.nav.isLoggedOut;
export const selectProfileData = (state) => state.nav.profileData;
export const selectPendingProfile = (state) => state.nav.pendingProfile;
export const selectUserProfile = (state) => state.nav.userProfile;
export const selectFeatureFlags = (state) => state.nav.featureFlags;
export const selectHelpAndSupportData = (state) => state.nav.helpAndSupportData;
export const selectOrderAddressId = (state) => state.nav.orderAddressId;
  
export default navSlice.reducer;