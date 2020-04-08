import React from 'react'
import {clientReducer} from "./reducer";
import {setClientInformation} from "./action";
import {ClientInformation} from "../../models/case/client-information";

describe('client reducer', () => {
    const state = clientReducer(null, null)
   it('set client information', () => {
       const clientInformation : ClientInformation = {
           address1: "address1",
           address2: "address2",
           cellPhone: "cellPhone",
           city: "city",
           emailAddress: "emailAddress",
           errors: [],
           firstName: "firstName",
           homePhone: "homePhone",
           isSuccess: false,
           lastName: "lastName",
           state: "state",
           workPhone: "workPhone",
           zipCode: "zipCode",
           $id: "id",
       }
       const stateWithClientInformation = clientReducer(state, setClientInformation(clientInformation))
       expect(stateWithClientInformation.clientInformation).toEqual(clientInformation)
   })

})