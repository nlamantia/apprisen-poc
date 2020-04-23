import {
    IonCol
} from "@ionic/react";
import React from "react";
import logo from "../../images/apprisen-logo.png";
import AdditionalResourcesCard from "./additional-resources-card";
 


const AdditionalResourcesPreview = (props) => {


    return (
            <>
            <IonCol size={"4"} sizeMd={"3"}>
                <AdditionalResourcesCard imageLink={logo} url="www.google.com" name="Test"/>
            </IonCol>
            <IonCol size={"4"} sizeMd={"3"}>
                <AdditionalResourcesCard imageLink={logo} url="www.google.com" name="Test"/>
            </IonCol>
            <IonCol size={"4"} sizeMd={"3"}>
                <AdditionalResourcesCard imageLink={logo} url="www.google.com" name="Test"/>
            </IonCol>
            </>
    )
}

export default AdditionalResourcesPreview
