import {
    IonBackButton,
    IonButton,
    IonButtons,
    IonCard,
    IonCol,
    IonContent,
    IonGrid,
    IonHeader,
    IonInput,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonPage,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToast,
    IonToolbar
} from "@ionic/react";
import {connect} from 'react-redux'
import React, {useState} from "react";
import {bindActionCreators} from "redux";
import {getCaseSummary} from "../../feature/case/action";
import {EmailData} from "models/client/email-data";
import {validateNonEmptyString, validateNonEmptyText} from "../common/validators";

const _Contact = (props) => {

    let intialEmailData = {
        subject : "",
        body : ""
    } as EmailData

    const [emailData, setEmailData] = useState<EmailData>(intialEmailData);
    const [shouldShowToast, setShouldShowToast] = useState<boolean>(false);
    
    const toastDuration = 3000;

    function handleChange(evt: any) {
        setEmailData({ ...emailData, [evt.target.name]: evt.target.value });
    }

    function isValidEmailData(emailData : EmailData) {
        return validateNonEmptyString(emailData.body) && validateNonEmptyText(emailData.subject);
    }

    const handleSend = () => {

        if (isValidEmailData(emailData)) {
            // Make API call
        }
        else {
            let x = document.getElementById("sharpenChat");
            x.style.display = "none";
            setShouldShowToast(true);
        }
    };

    const handleToastDismiss = () => {
        var x = document.getElementById("sharpenChat");
        x.style.display = "block";
        setShouldShowToast(false) 
    };


    return (
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/overview" />
                        </IonButtons>
                        <IonTitle>Contact Us</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <IonContent id="contact">
                    { <IonToast
                        isOpen={shouldShowToast}
                        onDidDismiss={handleToastDismiss}
                        message="Subject and Message can not be blank. Please try again."
                        color="danger"
                        duration={toastDuration}
                    /> }
                    <IonGrid>
                        <IonRow>
                            <IonCol size={"12"} sizeMd={"6"} offsetMd={"3"}>
                                <IonCard>
                                    <IonList class="ion-no-padding">
                                        <IonListHeader class={"white ion-text-center ion-padding-end"}>
                                            <IonLabel>
                                                <h2>Contact Us</h2>
                                            </IonLabel>
                                        </IonListHeader>
                                        <IonItem>
                                            <IonLabel position="stacked">Subject</IonLabel>
                                            <IonInput name="subject" placeholder="Subject" onIonChange={(e) => handleChange(e)}></IonInput>
                                        </IonItem>
                                        <IonItem>
                                            <IonLabel position="stacked">Message</IonLabel>
                                            <IonTextarea name="body" placeholder="Message" spellCheck={true} autoGrow={false} rows={5} onIonChange={(e) => handleChange(e)}></IonTextarea>
                                        </IonItem>
                                    </IonList>
                                    <IonItem>
                                        <IonButton className={'full-button'} expand="full" onClick={handleSend}>
                                            Send
                                        </IonButton>
                                    </IonItem>
                                </IonCard>
                            </IonCol>
                        </IonRow>
                    </IonGrid>
                </IonContent>
            </IonPage>
        </>
    )


};

const Contact = connect(
    state => ({}),
    dispatch => bindActionCreators({
        getCaseSummary
    }, dispatch)
)(
    _Contact
);

export default Contact;