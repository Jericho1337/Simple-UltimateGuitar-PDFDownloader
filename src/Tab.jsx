function Tab(props){

    let jsonTabModified = undefined;
    let stringTab = JSON.stringify(props.tab);
    if(stringTab !== undefined){
        stringTab = stringTab.replaceAll("[tab]", "").replaceAll("[/tab]", "").replaceAll("[ch]", "<b>").replaceAll("[/ch]","</b>");
        jsonTabModified = JSON.parse(stringTab);
    }
    
            
    return(
        <div id="tab-content">
            {jsonTabModified !== undefined ? <pre><div dangerouslySetInnerHTML={{ __html: jsonTabModified }} /></pre> : <pre>Loading...</pre>}
        </div>	
    );
}

export default Tab;