<!-- routify:options name="verify-email" -->
<script>
    import _ from "lodash";
    import { Spinner, Alert, Container } from "sveltestrap";
    import { afterPageLoad } from "@roxi/routify";
    import { verifyEmail } from "../../../services/auth-service";
    import { getResponseMessages } from "../../../services/api-service";

    export let token; // URL path variable--matches filename
    let loading = false;

    let errorMessage = "";
    let responseMessage = "";
    
    $afterPageLoad(async (page) => {
        resetAnyResultMessages();
        loading = true;
        const response = await verifyEmail(token);
        loading = false;
        ({responseMessage, errorMessage} = getResponseMessages(response));
    });

    function resetAnyResultMessages() {
        errorMessage = null;
        responseMessage = null;
    }

</script>

<Container fluid>
    {#if loading}
        <div class="text-center m-2">
            <h2>Verifying email....</h2>
            <Spinner size="lg" type="grow" color="primary" />
        </div>
    {/if}

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
</Container>
