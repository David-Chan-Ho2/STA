import { ChangeEvent, SubmitEvent, useState } from 'react'

interface IForm<T> {
    defaultForm: T
    handleSubmit: (form: T) => void
}

export const useForm = <T>({ defaultForm, handleSubmit }: IForm<T>) => {
    const [form, setForm] = useState<T>(defaultForm)

    const onReset = () => {
        setForm(defaultForm)
    }

    const onChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setForm({
            ...form,
            [name]: value,
        })
    }

    const onSubmit = (e: SubmitEvent) => {
        e.preventDefault()
        handleSubmit(form)
        onReset()
    }


    return { form, onChange, onSubmit, onReset }
}