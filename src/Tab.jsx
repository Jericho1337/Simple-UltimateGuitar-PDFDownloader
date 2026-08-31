function Tab(props){

    return(
        <div id="tab-content">
            {props.tab !== undefined ? <pre><div dangerouslySetInnerHTML={{ __html: props.tab }} /></pre> : <pre>Loading...</pre>}
        </div>	
    );
}

export default Tab;