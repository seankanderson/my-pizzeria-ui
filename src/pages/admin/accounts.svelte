<!-- routify:options name="login-or-register" -->
<script>
    import {
        Button,
        Label,
        Input,
        Col,
        Row,
        Container,
        Form,
        FormGroup,
        Alert,
        Spinner,
    } from "sveltestrap";
    import { goto } from "@roxi/routify";
    import { getResponseMessages } from "../../services/api-service";

    let loading = false;
    let errorMessage = "";
    let responseMessage = "";
    
    function resetAnyResultMessages() {
        responseMessage = null;
        errorMessage = null;
    }

    function getAllAccounts() {

    }
</script>


<Container fluid>
    <Row>
        <Col></Col>
        <Col class="d-flex justify-content-center">
            <a href={$url('menu')}>Home page</a>
            <Button size="lg" color=primary class="mt-2" on:click={navigateMenu} >Order Now</Button>
        </Col>
        <Col></Col>
    </Row>
    
</Container>
<Button></Button>