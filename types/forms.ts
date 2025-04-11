import { TemplateProps, FormVisibility } from "./resume";

export interface FormComponentProps {
  resumeState: TemplateProps;
  setResumeState: (newState: TemplateProps | ((prev: TemplateProps) => TemplateProps)) => void;
  formVisibility: FormVisibility;
  setFormVisibility: (visibility: FormVisibility | ((prev: FormVisibility) => FormVisibility)) => void;
}