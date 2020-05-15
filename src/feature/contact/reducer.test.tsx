import React from "react";
import {contactReducer} from "./reducer";
import {ContactStatus} from "./interface";
import {setMessage, setSentStatus} from "./action";

describe('Contact Reducer Tests', () => {
    it('Initial state - unknown action - should be initial state', () => {
        const state = contactReducer(undefined, {type: "blah", payload: {}});

        const { status, message } = state;
        expect(message).toBeNull();
        expect(status).toBe(ContactStatus.IDLE);
    });

    it('Calling setSentStatus', () => {
        const state = contactReducer(undefined, setSentStatus(ContactStatus.SUCCESS));

        const { status, message } = state;
        expect(message).toBeNull();
        expect(status).toBe(ContactStatus.SUCCESS);
    });

    it('Calling setMessage', () => {
        const expectedMessage = "Testing expected message";
        let state = contactReducer(undefined, setMessage(expectedMessage));

        const { status, message } = state;
        expect(status).toBe(ContactStatus.IDLE);
        expect(message).toBe(expectedMessage);
    })
});