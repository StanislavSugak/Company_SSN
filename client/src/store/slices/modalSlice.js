import { createSlice } from "@reduxjs/toolkit";

const modalSlice = createSlice({
    name: "modal",
    initialState: {
        modal :{
            isOpen: false,
            title: "",
            content: null,
            previousModals: [],
        },
        createTack: {
            name: "",
            description: "",
            stack: [],
            date_start: null
        }
    },
    reducers: {
        openModal: (state, action) => {
            if (state.modal.isOpen) {
                state.modal.previousModals.push({
                    title: state.modal.title,
                    content: state.modal.content,
                });
            }
            state.modal.content = action.payload.content;
            state.modal.title = action.payload.title;
            state.modal.isOpen = true;
        },
        backModal: (state) => {
            if (state.modal.previousModals.length > 0) {
                const previousModal = state.modal.previousModals.pop();
                state.modal.content = previousModal.content;
                state.modal.title = previousModal.title;
            } else {
                state.modal.isOpen = false;
                state.modal.content = null;
                state.modal.title = "";
            }
        },
        getResultModal: (state) => {
            state.modal.isOpen = false;
            state.modal.content = null;
            state.modal.title = "";
            state.modal.previousModals =[];
        },
        setName: (state, action) => {
            state.createTack.name = action.payload;
        },
        setDescription: (state, action) => {
            state.createTack.description = action.payload;
        },
        setStack: (state, action) => {
            state.createTack.stack = action.payload; // Обновляем стек
        },
        setStartDate: (state, action) => {
            state.createTack.date_start = action.payload; // Обновляем дату начала
        },
        resetProject: (state) => {
            state.createTack.name = '';
            state.createTack.description = '';
            state.createTack.stack = [];
            state.createTack.date_start = null;
        },
    },
});

export const { openModal, backModal, getResultModal, setName, setDescription } = modalSlice.actions;

export default modalSlice.reducer;