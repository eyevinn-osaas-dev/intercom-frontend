import { ErrorMessage } from "@hookform/error-message";
import { SubmitHandler, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import styled from "@emotion/styled";
import { DisplayContainerHeader } from "../landing-page/display-container-header";
import {
  PrimaryButton,
  DecorativeLabel,
  StyledWarningMessage,
} from "../landing-page/form-elements";
import { Spinner } from "../loader/loader";
import { useFetchProduction } from "../landing-page/use-fetch-production";
import { darkText, errorColour } from "../../css-helpers/defaults";
import { useDeleteProduction } from "./use-delete-production";
import { NavigateToRootButton } from "../navigate-to-root-button/navigate-to-root-button";
import { FormInputWithLoader } from "../landing-page/form-input-with-loader";

type FormValue = {
  productionId: string;
};

const Container = styled.form`
  max-width: 45rem;
  padding: 1rem 2rem 0 2rem;
`;

const RemoveConfirmation = styled.div`
  background: #91fa8c;
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid #b2ffa1;
  color: #1a1a1a;
`;

const FetchErrorMessage = styled.div`
  background: ${errorColour};
  color: ${darkText};
  padding: 0.5rem;
  margin: 1rem 0;
`;

const VerifyBtnWrapper = styled.div`
  margin: 3rem 0 2rem 2rem;
`;

const VerifyButtons = styled.div`
  display: flex;
  padding: 1rem 0 0 0;
`;

const Button = styled(PrimaryButton)`
  margin: 0 1rem 0 0;
`;

const StyledBackBtnIcon = styled.div`
  margin: 0 0 3rem 0;
`;

const ButtonWrapper = styled.div`
  margin: 2rem 0 2rem 0;
`;

export const ManageProductions = () => {
  const [showDeleteDoneMessage, setShowDeleteDoneMessage] =
    useState<boolean>(false);
  const [verifyRemove, setVerifyRemove] = useState<boolean>(false);
  const [removeId, setRemoveId] = useState<null | number>(null);
  const {
    reset,
    formState,
    formState: { errors, isSubmitSuccessful },
    register,
    handleSubmit,
  } = useForm<FormValue>();
  const [productionId, setProductionId] = useState<null | number>(null);

  const { onChange, onBlur, name, ref } = register("productionId", {
    required: "Production ID is required",
    min: 1,
  });

  const {
    error: productionFetchError,
    production,
    loading: fetchLoader,
  } = useFetchProduction(productionId);

  const {
    loading: deleteLoader,
    error: productionDeleteError,
    successfullDelete,
  } = useDeleteProduction(removeId);

  useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({
        productionId: "",
      });
      setVerifyRemove(false);
    }
  }, [formState.isSubmitSuccessful, isSubmitSuccessful, reset]);

  useEffect(() => {
    if (successfullDelete) {
      setVerifyRemove(false);
      setShowDeleteDoneMessage(true);
    }
  }, [successfullDelete]);

  const onSubmit: SubmitHandler<FormValue> = (value) => {
    if (deleteLoader) return;

    setRemoveId(parseInt(value.productionId, 10));
  };

  return (
    <Container>
      <StyledBackBtnIcon>
        <NavigateToRootButton />
      </StyledBackBtnIcon>
      <DisplayContainerHeader>Remove Production</DisplayContainerHeader>
      <FormInputWithLoader
        onChange={(ev) => {
          onChange(ev);
          const pid = parseInt(ev.target.value, 10);

          setProductionId(Number.isNaN(pid) ? null : pid);
          setShowDeleteDoneMessage(false);
        }}
        label="Production ID"
        placeholder="Production ID"
        name={name}
        inputRef={ref}
        onBlur={onBlur}
        type="number"
        loading={fetchLoader}
      />
      {productionFetchError && (
        <FetchErrorMessage>
          The production ID could not be fetched. {productionFetchError.name}{" "}
          {productionFetchError.message}.
        </FetchErrorMessage>
      )}
      {productionDeleteError && (
        <FetchErrorMessage>
          The production ID could not be deleted. {productionDeleteError.name}{" "}
          {productionDeleteError.message}.
        </FetchErrorMessage>
      )}
      <ErrorMessage
        errors={errors}
        name="productionId"
        as={StyledWarningMessage}
      />
      {production ? (
        <>
          <DecorativeLabel>Production name: {production.name}</DecorativeLabel>
          {!verifyRemove && (
            <ButtonWrapper>
              <PrimaryButton
                type="submit"
                className={deleteLoader ? "submit" : ""}
                onClick={() => setVerifyRemove(true)}
              >
                Remove
                {deleteLoader && <Spinner className="manage-production" />}
              </PrimaryButton>
            </ButtonWrapper>
          )}
          {verifyRemove && (
            <VerifyBtnWrapper>
              <p>Are you sure?</p>
              <VerifyButtons>
                <Button
                  type="submit"
                  className={deleteLoader ? "submit" : ""}
                  disabled={deleteLoader}
                  onClick={handleSubmit(onSubmit)}
                >
                  Yes
                  {deleteLoader && <Spinner className="manage-production" />}
                </Button>
                <Button
                  type="submit"
                  className={deleteLoader ? "submit" : ""}
                  onClick={() => {
                    setVerifyRemove(false);
                    reset({
                      productionId: "",
                    });
                  }}
                >
                  Go back
                  {deleteLoader && <Spinner className="manage-production" />}
                </Button>
              </VerifyButtons>
            </VerifyBtnWrapper>
          )}
        </>
      ) : (
        <StyledWarningMessage>
          Please enter a production id
        </StyledWarningMessage>
      )}
      {showDeleteDoneMessage && (
        <RemoveConfirmation>
          The production {production?.name} has been removed
        </RemoveConfirmation>
      )}
    </Container>
  );
};
