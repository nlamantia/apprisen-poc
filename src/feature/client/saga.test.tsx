import React from 'react'
import {GET_CLIENT_INFORMATION, getClientInformation, setClientInformation} from "./action";
import {getClientInformationWatcher, getClientInformationWorker} from "./saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {LoginResponse} from "../../models/auth/login-response";
import {ClientInformation} from "../../models/case/client-information";
import {callClientInformationEndpoint} from "../../services/rest.service";

describe('client saga', () => {
   it('waits for action', () => {
      const generator = getClientInformationWatcher()
      expect(generator.next().value).toEqual(
          takeEvery(GET_CLIENT_INFORMATION, getClientInformationWorker)
      )
   })

   it('handles successful client info call', () => {
      const credentials : LoginResponse = {
         Email: "email",
         Errors: [],
         ExpiresOn: "expiresOn",
         FirstName: "firstName",
         IsSuccess: true,
         LastName: "lastName",
         LinkedApplication: [{
            Application: "application",
            ExternalId: "externalId",
            $id: "$id"
         }],
         SignedToken: "signedToken",
         StatusCode: 5,
         UserId: "userId",
         Username: "username",
         $id: "$id",
      }
      const generator = getClientInformationWorker(getClientInformation(credentials))
      expect(generator.next().value).toEqual(
          call(callClientInformationEndpoint)
      )
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

      expect(generator.next(clientInformation).value).toEqual(
          put(setClientInformation(clientInformation))
      )
   })

   it('handles failed client info call', () => {
      // todo
   })
})