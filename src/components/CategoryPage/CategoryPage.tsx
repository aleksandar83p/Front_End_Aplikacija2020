import { faListAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Card, Container } from "react-bootstrap";
import CategoryType from "../../types/CategoryType";

interface CategoryPageProperties {
    // parametri izvuceni iz url idu u match properti  
    match: {
        params: {
            cId: number;
        }
    }
  
}

interface CategoryPageState {
    category?: CategoryType;
}

export default class CategoryPage extends React.Component<CategoryPageProperties> {
    state: CategoryPageState;

    constructor(props: Readonly<CategoryPageProperties>) {
        super(props);       
        
        this.state = {};
    }

    render(){
        return(
            <Container>   
                <Card>
                    <Card.Body>
                        <Card.Title>
                            <FontAwesomeIcon icon = { faListAlt } /> {this.state.category?.name}
                        </Card.Title>
                        <Card.Text>
                            Here, we will have out articles...
                        </Card.Text>
                    </Card.Body>
                </Card>  
            </Container>
        );        
    }

    // samo kada se kompomenta montira, ali ne i kada dobije nove podatke i krece novo montiranje
    componentWillMount(){
       this.getCategoryData();
    }

    componentWillReceiveProps(newProperties: CategoryPageProperties){
        if(newProperties.match.params.cId === this.props.match.params.cId){
            return;
        }
        
        this.getCategoryData();
    }

    private getCategoryData(){
        setTimeout( () => {
            const data: CategoryType = {
                name: 'Category ' + this.props.match.params.cId,
                categoryId: this.props.match.params.cId,
                items: []
            };

            this.setState({
                category: data,
            })
        }, 750);
    }
}