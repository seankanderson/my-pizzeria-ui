<script>
  import {
    Form,
    FormGroup,
    Row,
    Col,
    Input,
    Label,
    Button,
    Alert,
    Spinner,
    Container
  } from "sveltestrap";
  import {createOrUpdateTopping} from "../../services/menu-service";
  import CategoryPicker from "./category-picker.svelte"

  let loading = false;

  export let topping = {
    _id: "",
    name: "",
    shortDescription: "",
    longDescription: "",
    defaultPrice: 0.0,
    categories: [],
  };

  let errorMessage = "";
  let responseMessage = "";

function resetAnyResultMessages() {
  errorMessage = "";
  responseMessage = "";
}

  async function saveTopping() {
    console.log("topping...", topping);
    loading = true;
    const response = await createOrUpdateTopping(topping);
    console.log("saveTopping response...", response);
    topping = response.data;
    loading = false;
  }

  function clearToppingForm() {
    topping = {
      _id: "",
      name: "",
      shortDescription: "",
      longDescription: "",
      defaultPrice: 0.0,
      categories: [],
    };
  }
</script>

<Container fluid>
  <FormGroup>
    <Form>
      <Row>
        <Col>
          <Label class="float-end" for="nameInput">Name</Label>
        </Col>

        <Col>
          <Input
            bind:value={topping.name}
            type="text"
            name="name"
            id="nameInput"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Label class="float-end" for="shortDescriptionInput">Short Description</Label>
        </Col>

        <Col>
          <Input
            bind:value={topping.shortDescription}
            type="text"
            name="shortDescription"
            id="shortDescriptionInput"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Label class="float-end" for="longDescriptionInput">Long Description</Label>
        </Col>

        <Col>
          <Input
            bind:value={topping.longDescription}
            type="textarea"
            name="longDescription"
            id="longDescriptionInput"
          />
        </Col>
      </Row>

      <Row>
        <Col>
          <Label class="float-end" for="defaultPriceInput">Default Price</Label>
        </Col>

        <Col>
          <Input
            bind:value={topping.defaultPrice}
            type="number"
            name="defaultPrice"
            id="defaultPriceInput"
          />
        </Col>
      </Row>

     <CategoryPicker bind:currentCategories={topping.categories} ></CategoryPicker>

      {#if errorMessage || responseMessage || loading}
        <Row>
          <Col>
            {#if errorMessage}
              <Alert color="danger" class="mt-2">
                <p>{errorMessage}</p>
              </Alert>
            {/if}

            {#if responseMessage}
              <Alert color="success" class="mt-2">
                <p>{responseMessage}</p>
              </Alert>
            {/if}

            {#if loading}
              <div class="text-center m-2">
                <Spinner size="sm" type="border" color="primary" />
              </div>
            {/if}
          </Col>
        </Row>
      {/if}
      <Row>
        <Col />

        <Col>
          <Button
            disabled={loading}
            class="mt-2 float-end"
            on:click={clearToppingForm}
          >
            Clear
          </Button>
        </Col>

        <Col>
          <Button
            disabled={loading}
            class="mt-2 float-end"
            on:click={saveTopping}
          >
            Save
          </Button>
        </Col>
      </Row>
    </Form>
  </FormGroup>
</Container>
