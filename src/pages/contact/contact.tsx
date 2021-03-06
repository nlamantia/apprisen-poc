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
    IonListHeader, IonMenuButton,
    IonPage,
    IonRow,
    IonTextarea,
    IonTitle,
    IonToast,
    IonToolbar
} from "@ionic/react";
import {connect} from 'react-redux'
import React, {useEffect, useState} from "react";
import {bindActionCreators} from "redux";
import {EmailData} from "models/client/email-data";
import {validateNonEmptyString, validateNonEmptyText} from "../../common/validators";
import {sendEmail, setSentStatus} from "../../feature/contact/action";
import {EmailRequest} from "../../models/contact/email-request";
import {CONTACT_US_EMAILS} from "../../common/app-constants";
import {ContactStatus} from "../../feature/contact/interface";
import {Redirect} from "react-router";
import {getClientInformation} from "../../feature/client/action";
import {getCredentials} from "../../feature/auth/action";
import {ClientInformation} from "../../models/case/client-information";

const _Contact = (props) => {

    const { sendEmail, setSentStatus } = props;
    const { sentStatus, toastMessage } = props;
    const { clientInformation, getClientInformation } = props;
    const { credentials, getCredentials } = props;

    let intialEmailData = {
        subject : "",
        body : ""
    } as EmailData;

    const [emailData, setEmailData] = useState<EmailData>(intialEmailData);
    const [shouldShowToast, setShouldShowToast] = useState<boolean>(false);
    const [message, setMessage] = useState<string>(null);
    const [userInfo, setUserInfo] = useState<ClientInformation>(null);
    const toastDuration = 3000;

    function handleChange(evt: any) {
        setEmailData({ ...emailData, [evt.target.name]: evt.target.value });
    }

    function isValidEmailData(emailData : EmailData) {
        return validateNonEmptyString(emailData.body) && validateNonEmptyString(emailData.subject);
    }

    function getContactInfo() {
        let email = userInfo ? userInfo.emailAddress : "";
        let firstName = userInfo ? userInfo.firstName : "";
        let lastName = userInfo ? userInfo.lastName : "";

        return "</br></br>Email : " + email + "</br>First Name : " + firstName + "</br>Last Name : " + lastName;
    }

    function appendContactInfoToEmailBody(body : string) {
        return body + getContactInfo();
    }

    function newLinesToBrTag(str){
        return str.replace(/(?:\r\n|\r|\n)/g, '<br>');
    }

    const handleSend = () => {

        if (isValidEmailData(emailData)) {
            emailData.body = newLinesToBrTag(emailData.body)
            emailData.body = appendContactInfoToEmailBody(emailData.body)
            sendEmail({
                recipients: CONTACT_US_EMAILS,
                subject: emailData.subject,
                body: emailData.body
            } as EmailRequest);
        }
        else {
            let iris = document.getElementById("sharpenChat");
            iris.style.display = "none";
            setShouldShowToast(true);
            setMessage("Subject and Message can not be blank. Please try again.");
        }
    };

    const handleToastDismiss = () => {
        let iris = document.getElementById("sharpenChat");
        iris.style.display = "block";
        setShouldShowToast(false);
        setSentStatus(ContactStatus.IDLE);
    };

    useEffect(() => {
        if (toastMessage) {
            setMessage(toastMessage);
        }

        if (credentials && credentials.linkedApplication) {
            if (!userInfo) {
                if (!clientInformation || !clientInformation.firstName) {
                    getClientInformation()
                } else {
                    setUserInfo(clientInformation);
                }
            }
        } else {
            getCredentials();
        }
        setShouldShowToast(sentStatus === ContactStatus.FAILURE);
    }, [toastMessage, sentStatus, userInfo, clientInformation, credentials]);

    return (
        sentStatus === ContactStatus.SUCCESS
        ? <Redirect to={'/overview'} />
        :
        <>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonButtons slot="start">
                            <IonBackButton defaultHref="/overview" />
                        </IonButtons>
                        <IonTitle>Contact Us</IonTitle>
                        <IonButtons slot="end">
                            <IonMenuButton />
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent id="contact">
                    <IonToast
                        isOpen={shouldShowToast}
                        onDidDismiss={handleToastDismiss}
                        message={message}
                        color="danger"
                        duration={toastDuration}
                    />
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
    state => ({
        sentStatus: state.contact.status,
        toastMessage: state.contact.message,
        credentials: state.auth.credentials,
        clientInformation: state.client.clientInformation
    }),
    dispatch => bindActionCreators({
        sendEmail,
        setSentStatus,
        getClientInformation,
        getCredentials
    }, dispatch)
)(
    _Contact
);

export default Contact;