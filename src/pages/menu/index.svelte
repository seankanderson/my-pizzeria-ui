<!-- routify:options name="menu-order" -->
<script>
  import { metatags, url, goto } from "@roxi/routify";
  import { Button, Col, Row, Container } from "sveltestrap";
  metatags.title = "My Pizzeria";
  metatags.description = "Online ordering for pizzerias!";
  function navigateMenu() {
    $goto("./menu");
  }
</script>

<main>
  <Container fluid>
    <Row>
      <Col />
      <Col class="d-flex justify-content-center">
        <Button size="lg" color="primary" class="mt-2" on:click={navigateMenu}>
          Order Now
        </Button>
      </Col>
      <Col />
    </Row>
  </Container>
</main>
