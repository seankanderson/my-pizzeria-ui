<!-- routify:options name="manage-accounts" -->
<script>
  import {
    Button,
    Col,
    Row,
    Container,
    Table,
    Alert,
    Spinner,
  } from "sveltestrap";
  import { goto } from "@roxi/routify";
  import { getResponseMessages } from "../../services/api-service";
  import { getAllAccounts } from "../../services/account-service";

  let loading = false;
  let errorMessage = "";
  let responseMessage = "";
  let accounts = [];
  function resetAnyResultMessages() {
    responseMessage = null;
    errorMessage = null;
  }

  async function getAccounts() {
    loading = true;
    resetAnyResultMessages();
    const result = await getAllAccounts();
    loading = false;
    console.log("result...", result);
    if (result.error) {
      errorMessage = result.error;
      return;
    }
    accounts = result.data;
  }
</script>

<Container fluid>
  <Row>
    <Col />
    <Col class="d-flex justify-content-center">
      <Button size="lg" color="primary" class="mt-2" on:click={getAccounts}>
        Load Accounts
      </Button>
    </Col>
    <Col />
  </Row>

  {#if loading}
    <div class="text-center m-2">
      <Spinner size="lg" type="border" color="primary" />
    </div>
  {/if}

  {#if errorMessage}
    <Alert color="danger" class="mt-2">
      <p>{errorMessage}</p>
    </Alert>
  {/if}

  <Table>
    <thead>
      <tr>
        <th>Username/email</th>
        <th>Role</th>
        <th>Is Verified</th>
        <th>Created</th>
      </tr>
    </thead>
    <tbody>
      {#each accounts as account}
        <tr>
          <td>{account.email}</td>
          <td>{account.role}</td>
          <td>{account.isVerified}</td>
          <td>{account.created}</td>
        </tr>
      {/each}
    </tbody>
  </Table>
</Container>
