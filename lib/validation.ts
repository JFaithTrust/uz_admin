import * as z from "zod";

export const LoginFormSchema = z.object({
  phoneNumber: z.string().min(3, {
    message: "User name must be at least 3 characters long",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters long",
  }),
});

export const CreateJobsSchema = z.object({
  title: z.string().min(3, {
    message: "Job title must be at least 3 characters long",
  }),
  salary: z.string().min(3, {
    message: "Job salary must be at least 3 characters long",
  }),
  gender: z.enum(["0", "1", "2"], {
    required_error: "You need to select a notification type.",
  }),
  workingTime: z.string().min(3, {
    message: "Job working time must be at least 3 characters long",
  }),
  workingSchedule: z.string().min(3, {
    message: "Job working schedule must be at least 3 characters long",
  }),
  deadline: z.date(),
  telegramLink: z.string().min(3, {
    message: "Job telegram link must be at least 3 characters long",
  }),
  instagramLink: z.string().min(3, {
    message: "Job instagram link must be at least 3 characters long",
  }),
  tgUserName: z.string().min(3, {
    message: "Job tg user name must be at least 3 characters long",
  }),
  phoneNumber: z.string().min(3, {
    message: "Job phone number must be at least 3 characters long",
  }),
  benefit: z.string().min(3, {
    message: "Job benefit must be at least 3 characters long",
  }),
  requirement: z.string().min(3, {
    message: "Job requirement must be at least 3 characters long",
  }),
  minAge: z.number().min(0, {
    message: "Job min age must be at least 0",
  }),
  maxAge: z.number().min(0, {
    message: "Job max age must be at least 0",
  }),
  lang: z.number().min(0, {
    message: "Job lang must be at least 0",
  }),
  lat: z.number().min(0, {
    message: "Job lat must be at least 0",
  }),
  //   latitude: z.number().min(0, {
  //     message: "Job latitude must be at least 0",
  //   }),
  //   longitude: z.number().min(0, {
  //     message: "Job longitude must be at least 0",
  //   }),
});

export const CreateWorkerSchema  = z.object(
  {
    deadline: z.date({
      required_error: "A date of birth is required.",
    }),
    birthDate: z.date({
      required_error: "A date of birth is required.",
    }),
    title: z.string().min(3, {
      message: "Job title must be at least 3 characters long",
    }),
    salary: z.string().min(0, {
      message: "Job min age must be at least 0",
    }),
    gender: z.enum(["0", "1", "2"], {
      required_error: "You need to select a notification type.",
    }),
    workingTime: z.string().min(3, {
      message: "Job working time must be at least 3 characters long",
    }),
    workingSchedule: z.string().min(3, {
      message: "Job working schedule must be at least 3 characters long",
    }),
    telegramLink: z.string().min(3, {
      message: "Job telegram link must be at least 3 characters long",
    }),
    instagramLink: z.string().min(3, {
      message: "Job instagram link must be at least 3 characters long",
    }),
    tgUserName: z.string().min(3, {
      message: "Job tg user name must be at least 3 characters long",
    }),
    phoneNumber: z.string().min(3, {
      message: "Job phone number must be at least 3 characters long",
    }),
    categoryId: z.string().min(3, {
      message: "Job category name must be at least 3 characters long",
    }),
    regionId: z.string().min(3, {
      message: "Job region name must be at least 3 characters long",
    }),
    districtId: z.string().min(3, {
      message: "Job district name must be at least 3 characters long",
    }),
  }
)

export const CreateFaqSchema = z.object({
    question: z.string().min(3, {
        message: "Question must be at least 3 characters long",
    }),
    answer: z.string().min(3, {
        message: "Answer must be at least 3 characters long",
    }),
})

export const CreateFeedbackSchema = z.object({
    message: z.string().min(3, {
        message: "Message must be at least 3 characters long",
    }),
    fullName: z.string().min(3, {
        message: "Full name must be at least 3 characters long",
    }),
    dueDate: z.date(
        {
            required_error: "A date of birth is required.",
        }
    ),
})

export const CreateDistrictSchema = z.object({
    regionId: z.string().min(3, {
        message: "Region name must be at least 3 characters long",
    }),
    name: z.string().min(3, {
        message: "Category name must be at least 3 characters long",
    }),
})

export const CreateRegionSchema = z.object({
    name: z.string().min(3, {
        message: "Region name must be at least 3 characters long",
    }),
})

export const CreateJobCategorySchema = z.object({
    title: z.string().min(3, {
        message: "Category name must be at least 3 characters long",
    }),
    description: z.string().min(3, {
        message: "Category description must be at least 3 characters long",
    }),
})