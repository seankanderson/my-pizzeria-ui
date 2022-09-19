<!-- routify:options name="verify-email" -->
<script>
    import _ from 'lodash';
    import { Spinner, Alert } from "sveltestrap";
    import { params, afterPageLoad } from "@roxi/routify";
    import { verifyEmail } from "../../../services/auth-service";

    export let token;
    let loading = false;

    let errorMessage = "";
    let showErrorMessage = false;

    let responseMessage = "";
    let showResponseMessage = false;

    $afterPageLoad(async (page) => {
        resetAnyResultMessages();

        loading = true;
        const result = await verifyEmail(token);
        loading = false;

        showAnyResultMessages(result);
    });

    function resetAnyResultMessages() {
        errorMessage = null;
        showErrorMessage = false;
        showResponseMessage = false;
    }

    function showAnyResultMessages(result) {
        if (result.response) {
            responseMessage = _.get(result.response, "message");
            if (!responseMessage) {
                responseMessage = result.response;
            }
            showResponseMessage = true;
        }

        if (result.error) {
            errorMessage = result.error;
            showErrorMessage = true;
        }
    }
</script>

<h3>Verifying email....</h3>

{#if loading}
    <div class="text-center m-2">
        <Spinner size="lg" type="border" color="primary" />
    </div>
{/if}

{#if showErrorMessage}
    <Alert color="danger" class="mt-2">
        <p>{errorMessage}</p>
    </Alert>
{/if}

{#if showResponseMessage}
    <Alert color="success" class="mt-2">
        <p>{responseMessage}</p>
    </Alert>
{/if}

