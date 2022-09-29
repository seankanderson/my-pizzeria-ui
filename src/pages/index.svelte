<script>
    import { metatags, url, goto } from '@roxi/routify'
    import Route from '@roxi/routify/runtime/Route.svelte';
    import {
        Button,
        Col,
        Row,
        Container,
        Alert
    } from "sveltestrap";
    metatags.title = 'My Pizzeria';
    metatags.description = 'Online ordering and menu management';
    function navigateMenu() {
        console.log('url...', $url());
        $goto('./menu');
    };
</script>

<main>
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
    
</main>


