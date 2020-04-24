import {
    IonCard,
    IonCol,
    IonGrid,
    IonItem,
    IonLabel,
    IonList,
    IonListHeader,
    IonProgressBar,
    IonRow,
    IonFooter,
    IonToolbar,
    IonIcon,
    IonButton
} from '@ionic/react';
import React from "react";
import { logoFacebook, logoTwitter, logoLinkedin, logoInstagram, logoPinterest, logoYoutube, star } from 'ionicons/icons';
import { InAppBrowser } from '@ionic-native/in-app-browser';


const SocialMediaFooter = (props) => {

    const handleOnClick = (urlRoute) => {
        InAppBrowser.create(urlRoute,'_system', 'location=yes');
    }
    
    return (
        <>
            <IonFooter>
                
                <IonToolbar class="toolbar-header">
                    <IonGrid className="social-media-grid" fixed={true}>
                        <IonRow>
                            <IonCol className="social-media-column" size="2">
                                <IonButton fill="clear" size="small" onClick={() => handleOnClick("https://www.facebook.com/Apprisen/")}> 
                                    <IonIcon size="small" icon={logoFacebook} slot="icon-only"></IonIcon>
                                </IonButton>
                            </IonCol>
                            <IonCol className="social-media-column" size="2">
                                <IonButton size="small" fill="clear" onClick={() => handleOnClick("https://twitter.com/Apprisen/")}>
                                    <IonIcon size="small" icon={logoTwitter} slot="icon-only"></IonIcon>
                                </IonButton>
                            </IonCol>
                            <IonCol className="social-media-column" size="2">
                                <IonButton size="small" fill="clear" onClick={() => handleOnClick("https://www.linkedin.com/company/apprisen//")}>
                                    <IonIcon size="small" icon={logoLinkedin} slot="icon-only"></IonIcon>
                                </IonButton>
                            </IonCol>
                            <IonCol className="social-media-column" size="2">
                                <IonButton size="small" fill="clear" onClick={() => handleOnClick("https://www.instagram.com/apprisenempowers/")}>
                                    <IonIcon size="small" icon={logoInstagram} slot="icon-only"></IonIcon>
                                </IonButton>
                            </IonCol>
                            <IonCol className="social-media-column" size="2">
                                <IonButton size="small" fill="clear" onClick={() => handleOnClick("https://www.pinterest.com/apprisen/")}>
                                    <IonIcon size="small" icon={logoPinterest} slot="icon-only"></IonIcon>
                                </IonButton>
                            </IonCol>
                            <IonCol className="social-media-column" size="2">
                                <IonButton size="small" fill="clear" onClick={() => handleOnClick("https://www.youtube.com/apprisen")}>
                                    <IonIcon size="small" icon={logoYoutube} slot="icon-only"></IonIcon>
                                </IonButton>
                            </IonCol>
                        </IonRow>
                    </IonGrid>  
                </IonToolbar>

            </IonFooter>
        </>
    )
};

export default SocialMediaFooter