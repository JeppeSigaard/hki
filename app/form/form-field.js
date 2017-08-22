// Requires
let React = require( 'react' ),
    ReactDOM = require( 'react-dom' ),
    Globals = require('../modules/global/global.js'),
    Autosize = require( '../modules/tools/autosize.js' );

class FormField extends React.Component {

    constructor() {
        super();
        this.field_id = '';
        this.hooks = {};
        this.debounce = null;
        this.state = {
            select_options : null, 
            select_value : 'default', 
            checkbox : null, 
            value : '', 
            empty : true,
            error : false,
        };
    }
    
    // Fire change every 200 ms max
    debounceFieldChangeTrigger(value){
        if(this.debounce != null) clearTimeout(this.debounce);
        this.debounce = setTimeout(() => {
            Globals.hooks.trigger('field-change', {form_id : this.props.form, field : this.props.field.field_name, value : value});
        }, 200);
    }
    
    // Handle fcous
    handleFocus(){
        this.setState({focus : true});
    }
    
    // Handle field change
    handleChange(e){
        let value;
        
        // Set array of values if checkbox
        if(this.props.field.field_type == 'checkbox') {
            value = this.state.value;
            if(e.target.checked) value.push(e.target.value);
            else{value.pop(e.target.value)}
        }
         
        // Else set value as target value
        else value = e.target.value;
        
        // Set field state
        this.setState({value: value, error : false}, () => {
            
            // Validate if select
            if(this.props.field.field_type === 'select') this.validateField();
        
        });
        
        // Trigger global field change hook
        this.debounceFieldChangeTrigger(value);
    }
    
    formLogic(logic){
        
        if(this.props.form !== logic.form_id || this.props.field.field_name !== logic.field) return;
        this.setState({hidden : ( logic.action === 'hide' ? true : false ) });
    }
    
    handleBlur(){
        this.setState({focus : false});
        
        this.validateField();
    }
    
    validateField(){
        
        if (this.state.value == '') this.setState({empty : true});
        else this.setState({empty : false});
        
        
        if (this.state.value == '' && this.props.field.field_required == 'true') {this.setState({error : true}); return false;} 
        
        // All good
        this.setState({error : false}); return true;
    }
    
    componentDidMount(){
        
        this.field_id = 'form-'+this.props.form+'-'+this.props.field.field_name;
        
        // Activate autosize for teaxtareas
        if(this.props.field.field_type === 'textarea'){
            Autosize(document.querySelector('#' + this.field_id));
        }
        
        // Create select options for select
        if(this.props.field.field_type === 'select'){
            let options = [],
                selected_value = 'default';
            
            for (let i in this.props.field.select_options){if (this.props.field.select_options.hasOwnProperty(i)){
                const option = this.props.field.select_options[i];
                
                if(option.option_checked == 'checked') selected_value = option.option_value;  
                
                options.push(<option key={'option-' + i} value={option.option_value}>{option.option_label}</option>);
            }}
            
            options.unshift(<option disabled key="option-default" value="default">{this.props.field.field_label}</option>);
            this.setState({select_options : options, select_value : selected_value});
            
           
        }
        
        // checkboxes
        if(this.props.field.field_type === 'checkbox'){
            let boxes = [];
            for (let i in this.props.field.field_opts){if(this.props.field.field_opts.hasOwnProperty(i)){
                const cb = this.props.field.field_opts[i];
                
                boxes.push(<div className="cb-container" key={'cb-' + i}>
                    <label htmlFor={this.props.field.field_name + '-' + i}>{cb.opt_label}</label>
                    <input onChange={this.handleChange.bind(this)} defaultChecked={cb.opt_checked} type="checkbox" name={this.props.field.field_name} id={this.props.field.field_name + '-' + i} value={cb.opt_value}/>
                </div>);
            }}
            
            this.setState({checkbox : boxes, value : []});
        }
        
        this.hooks.required = Globals.hooks.add('validate-form',this.validateField.bind(this));
        this.hooks.formLogic = Globals.hooks.add('form-logic',this.formLogic.bind(this));
    }
    
    componentWillUnmount(){
        Globals.hooks.remove('validate-form', this.hooks.required);
        Globals.hooks.remove('form-logic', this.hooks.formLogic);
    }
    
    // Render
    render() {
        const field = this.props.field,
              common_fields = ['text','email','tel','password','search','number'],
              field_id ='form-'+this.props.form+'-'+field.field_name;
        
        let fscn = field.field_type;
        if (this.state.focus) fscn += ' focus';
        if (!this.state.empty) fscn += ' has-content';
        if (this.state.error) fscn += ' error';
        
        // Return a hidden field
        if('hidden' == field.field_type || this.state.hidden === true) return(
            <input type="hidden" name={field.field_name} value={field.field_value}/>
        );
        
        // Return a common field
        if (common_fields.indexOf(field.field_type) > -1) return(
            
            <fieldset className={fscn}>
                <label htmlFor={field_id}>{field.field_label}</label>
                <input value={this.state.value} onChange={this.handleChange.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} name={field.field_name} id={field_id} type={field.field_type} />
            </fieldset>
        );
        
        // Textarea
        if('textarea' == field.field_type) return(
            <fieldset className={fscn}>
                <label htmlFor={field_id}>{field.field_label}</label>
                <textarea value={this.state.value} onChange={this.handleChange.bind(this)} onFocus={this.handleFocus.bind(this)} onBlur={this.handleBlur.bind(this)} name={field.field_name} id={field_id} type={field.field_type}></textarea>
            </fieldset>
        );
        
        // Select
        if('select' == field.field_type) return(
            <fieldset className={fscn} >
                <select name={field.field_name} id={field_id} defaultValue={this.state.select_value} onChange={this.handleChange.bind(this)}>
                    {this.state.select_options}
                </select>
            </fieldset>
        );
        
        // checkbox
        if('checkbox' == field.field_type) return(
            <fieldset className={fscn}>
                {field.field_label != null && field.field_label != '' &&
                <div className="cb-label">{field.field_label}</div>}
                {this.state.checkbox != null && this.state.checkbox}
            </fieldset>
        );
        
        return null;
    }

} module.exports = FormField;