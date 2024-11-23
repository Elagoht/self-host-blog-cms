import FormCategory from "@/components/forms/FormCategory"
import Modal from "@/components/ui/Modal"
import dictionary from "@/i18n"
import { FC } from "react"

type CategoriesEditModalProps = {
  category?: CategoryResponse
  isOpen: boolean
  close: () => void
}

const CategoriesEditModal: FC<CategoriesEditModalProps> = ({
  category, isOpen, close
}) =>
  <Modal
    title={dictionary.categories.edit.title}
    isOpen={isOpen}
    close={close}
  >
    {category &&
      <FormCategory
        mode="edit"
        slug={category.slug}
        initialValues={{
          name: category.name,
          description: category.description,
          spot: category.spot,
          keywords: category.keywords
        }}
        close={close}
      />
    }
  </Modal>

export default CategoriesEditModal