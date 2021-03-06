import React from 'react'
import {GET_CLIENT_INFORMATION, getClientInformation, setClientInformation} from "./action";
import {getClientInformationWatcher, getClientInformationWorker} from "./saga";
import {call, put, takeEvery} from "redux-saga/effects";
import {LoginResponse} from "../../models/auth/login-response";
import {ClientInformation} from "../../models/case/client-information";
import {callClientInformationEndpoint} from "../../services/rest-service";

describe('client saga', () => {
   it('waits for action', () => {
      const generator = getClientInformationWatcher()
      expect(generator.next().value).toEqual(
          takeEvery(GET_CLIENT_INFORMATION, getClientInformationWorker)
      )
   })

   it('handles successful client info call', () => {
      const credentials : LoginResponse = {
         email: "email",
         errors: [],
         expiresOn: "expiresOn",
         firstName: "firstName",
         isSuccess: true,
         lastName: "lastName",
         linkedApplication: [{
            application: "application",
            externalId: "externalId",
            $id: "$id"
         }],
         signedToken: "signedToken",
         statusCode: 5,
         userId: "userId",
         username: "username",
         $id: "$id",
      }
      const generator = getClientInformationWorker(getClientInformation(credentials))
      expect(generator.next().value).toEqual(
          call(callClientInformationEndpoint)
      )
      const clientInformation : ClientInformation = {
         address1: "address1",
         address2: "address2",
         cellPhone: "cellPhone",
         city: "city",
         emailAddress: "emailAddress",
         errors: [],
         firstName: "firstName",
         homePhone: "homePhone",
         isSuccess: true,
         lastName: "lastName",
         state: "state",
         workPhone: "workPhone",
         zipCode: "zipCode",
         $id: "id",
      }

      expect(generator.next(clientInformation).value).toEqual(
          put(setClientInformation(clientInformation))
      )
   })
})