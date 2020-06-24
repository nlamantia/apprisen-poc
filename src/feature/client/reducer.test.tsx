import React from 'react'
import {clientReducer} from "./reducer";
import {setClientInformation} from "./action";
import {ClientInformation} from "../../models/case/client-information";

describe('client reducer', () => {
    const state = clientReducer(null, null)
   it('set client information', () => {
       const clientInformation : ClientInformation = {
           Address1: "address1",
           Address2: "address2",
           CellPhone: "cellPhone",
           City: "city",
           EmailAddress: "emailAddress",
           Errors: [],
           FirstName: "firstName",
           HomePhone: "homePhone",
           IsSuccess: false,
           LastName: "lastName",
           State: "state",
           WorkPhone: "workPhone",
           ZipCode: "zipCode",
           $id: "id",
       }
       const stateWithClientInformation = clientReducer(state, setClientInformation(clientInformation))
       expect(stateWithClientInformation.clientInformation).toEqual(clientInformation)
   })

})