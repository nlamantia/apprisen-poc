import React, {useEffect, useState} from "react";
import {IonItem, IonLabel, IonList, IonListHeader, IonSpinner} from "@ionic/react";

interface ExpandableListProps {
    defaultSize?: number;
    title?: string;
    data: any[];
    onItemDisplay: Function;
}

const ExpandableList = (props : ExpandableListProps) => {
    const {defaultSize, title, data, onItemDisplay} = props;

    const [visibleItems, setVisibleItems] = useState<any[]>(data ? data : []);
    const [expandMessage, setExpandMessage] = useState<string>("Show more");

    const handleExpandClick = () => {
        let sizeParam = defaultSize ? defaultSize : 5;
        setData(sizeParam);
    };

    const setData = (size) => {
        let trueDefaultSize = size <= data.length ? size : data.length;
        setExpandMessage(visibleItems.length === trueDefaultSize ? "Show less" : "Show more");
        setVisibleItems(visibleItems.length === trueDefaultSize ? data : data.slice(0, trueDefaultSize));
    };

    useEffect(() => {
        if (data) {
            setData(defaultSize ? defaultSize : 5)
        }
    }, [defaultSize, data]);

    return (
        <IonList class="ion-no-padding">
            <IonListHeader class={"white"}>
                <IonLabel>
                    <h2>{title ? title : "Expandable List"}</h2>
                </IonLabel>
            </IonListHeader>
            {data
                ?
                (visibleItems.length > 0
                        ?
                        <>
                            {visibleItems.map((item) => onItemDisplay(item))}
                            <IonItem onClick={handleExpandClick}>
                                <IonLabel color={'primary'} style={{cursor: 'pointer'}}>
                                    <h3 className={'full-center'}>
                                        {expandMessage}
                                    </h3>
                                </IonLabel>
                            </IonItem>
                        </>
                        : <IonItem>
                            <IonLabel>
                                <h3 className={'full-center'}>
                                    No data found
                                </h3>
                            </IonLabel>
                        </IonItem>
                )
                : <IonItem>
                    <IonLabel>
                        <h3 className={'full-center'}>
                            <IonSpinner/>
                        </h3>
                    </IonLabel>
                </IonItem>}
        </IonList>
    );
};

export default ExpandableList;