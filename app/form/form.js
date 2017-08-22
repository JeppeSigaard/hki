// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    FormField = require( '../form/form-field.js' ),
    Globals = require('../modules/global/global.js');

class Form extends React.Component {

    constructor() {
        super();
        this.hooks = {};
        this.state = {
            id: null, 
            title: null, 
            fields : null, 
            action : '', 
            ajax_action : null, 
            loading : false, 
            required : [],
            success : null,
            data : {},
        }
    }
    
    sendFormData(data){
        return new Promise(( resolve, reject ) => {
            // Opens new request
            let request = new XMLHttpRequest();
            request.addEventListener( 'load', ( data ) => {
                resolve ( JSON.parse(data.target.response) );
            });
            
            // parse data as string
            let str = '',
                c = 0;
            if ( typeof data === 'object' || data.length < 1 ) {

                // Set string
                if(data != null){for(var k in data){if(data.hasOwnProperty(k)){
                    c ++;
                    str += (c > 1) ? '&' : '';
                    str += encodeURIComponent(k) + '=' + encodeURIComponent(data[k]);
                }}}
            }

            // Sends request
            request.open( 'POST', Globals.theme_settings.ajax_url, true);
            request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            request.send(str);
        });
    }
    
    handleLogic(data){
        if(this.state.logic == null) return;
        
        
        for (let i in this.state.logic){if(this.state.logic.hasOwnProperty(i)){
            const logic = this.state.logic[i],
                  action = logic.action,
                  counterAction = (logic.action == 'show') ? 'hide' : 'show',
                  equal = ( (this.state.data[logic.actor] === logic.value) || ( Array.isArray(this.state.data[logic.actor]) && this.state.data[logic.actor].indexOf(logic.value) !== -1) ),
                  more = ( parseInt(this.state.data[logic.actor]) > parseInt(logic.value) ),
                  less = ( parseInt(this.state.data[logic.actor]) < parseInt(logic.value) );
            
            let sendAction = null;
            
            if(logic.compare === '=') sendAction = ( equal ? action : counterAction);
            if(logic.compare === '!=') sendAction = ( !equal ? action : counterAction );
            if(logic.compare === '>') sendAction = ( more ? action : counterAction );
            if(logic.compare === '<') sendAction = ( less ? action : counterAction );
            
            Globals.hooks.trigger('form-logic', {form_id : this.state.id, field : logic.target, action : sendAction});
        }}
    }
    
    handleFieldChange(data){
        
        // Only update this form
        if(data.form_id == null || data.form_id !== this.state.id) return;
        
        // Set field name value
        let formData = this.state.data;
        formData[data.field] = data.value;
        
        // update state
        this.setState({data : formData});
        
        // handle logic 
        if(this.state.logic !== null) this.handleLogic(data);
    }
    
    handleSubmit(event){
        event.preventDefault();
        if (this.state.loading) return;
        this.setState({loading : true});
        
        let required_ok = true;
        for (let i in this.state.required){if(this.state.required.hasOwnProperty(i)){
            
            if (this.state.data[this.state.required[i]] == null || this.state.data[this.state.required[i]] == ''){
                required_ok = false;
                this.setState({loading : false});
                Globals.hooks.trigger('validate-form', this.state.id);
            }
        }}
        
        if (!required_ok) return;
        
        this.sendFormData(this.state.data).then( (resp) => {
            this.setState({loading : false});
            
            if(resp.message){this.setState({success : resp.message});}
            
            if(resp.redirect){window.location.href = resp.redirect;}
        });
    }
    
    componentDidMount(){
        
        Globals.api.getForm(this.props.id).then( (resp) => {
            
            /* set fields */
            let fields = [],
                required = [],
                data = {
                    form_id : resp.id,
                    action : resp.ajax_action,
                    nonce : Globals.theme_settings.nonce,
                };
            
            for( let i in resp.fields){if(resp.fields.hasOwnProperty(i)){
                if(resp.fields[i].field_required == 'true') required.push(resp.fields[i].field_name);
                fields.push(<FormField key={'form-field-' + i} form={resp.id} field={resp.fields[i]}/>);
            }};
            
            this.setState({
                submit_text : resp.submit_text, 
                id: resp.id, 
                title: resp.title, 
                fields : fields, 
                action : resp.action, 
                ajax_action : resp.ajax_action,
                required : required,
                data : data,
                logic : resp.logic,
            }, () => {
                
                // Handle initial logic
                if(this.state.logic !== null) this.handleLogic(data);
                
                // add field change hook
                this.hooks.fieldChange = Globals.hooks.add('field-change', this.handleFieldChange.bind(this));
            });   
        });
    }
    
    componentWillUnmount(){
        Globals.hooks.remove('field-change', this.hooks.fieldChange);
    }
    
    // Render
    render() {
        
        if (this.state.fields == null) return null;
        
        let cn = 'smamo-form-wrapper';
        if (this.state.loading) cn += ' loading' ;
        
        if(this.state.success != null) return(
            <div className={cn}>
                <div className="form-success">
                    <h3 className="form-success-heading" dangerouslySetInnerHTML={{__html: this.state.success.heading}}></h3>
                    <div className="form-success-body" dangerouslySetInnerHTML={{__html: this.state.success.body}}></div>
                </div>
            </div>
        );
        
        return(
            <div className={cn}>
                <form id={'smamo-form-'+this.state.id} className="smamo-form" onSubmit={this.handleSubmit.bind(this)} method="post" action={this.state.action}>
                    {this.props.children}
                    {this.state.ajax_action != null && <input type="hidden" name="action" value={this.state.ajax_action} />}
                    {this.props.id != null && <input type="hidden" name="form_id" value={this.props.id} />}
                    {Globals.theme_settings.nonce != null && <input type="hidden" name="nonce" value={Globals.theme_settings.nonce} />}
                    {this.state.fields != null && this.state.fields}
                    <fieldset className="submit">
                        <input type="submit" value={this.state.submit_text}></input>
                    </fieldset>
                </form>
            </div>
        );
    }

} module.exports = Form;