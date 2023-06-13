import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Badge,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  HStack,
  Input,
  SimpleGrid,
  VStack,
  Text,
} from "@hope-ui/solid"
import { createSignal, For, JSXElement, onCleanup, Show } from "solid-js"
import { LinkWithBase } from "~/components"
import { useFetch, useManageTitle, useRouter, useT } from "~/hooks"
import { setMe, me, getSettingBool } from "~/store"
import { PEmptyResp, UserMethods, UserPermissions } from "~/types"
import { handleResp, notify, r } from "~/utils"

const PermissionBadge = (props: { can: boolean; children: JSXElement }) => {
  return (
    <Badge colorScheme={props.can ? "success" : "danger"}>
      {props.children}
    </Badge>
  )
}

const Profile = () => {
  const t = useT()
  useManageTitle("manage.sidemenu.profile")
  const { to, searchParams } = useRouter()
  const [username, setUsername] = createSignal(me().username)
  const [password, setPassword] = createSignal("")
  const [loading, save] = useFetch(
    (ssoID?: boolean): PEmptyResp =>
      r.post("/me/update", {
        username: ssoID ? me().username : username(),
        password: ssoID ? "" : password(),
        sso_id: me().sso_id,
      })
  )
  const saveMe = async (ssoID?: boolean) => {
    const resp = await save(ssoID)
    handleResp(resp, () => {
      setMe({ ...me(), username: username() })
      if (!ssoID) {
        notify.success(t("users.update_profile_success"))
        to(`/@login?redirect=${encodeURIComponent(location.pathname)}`)
      } else {
        to("")
      }
    })
  }
  function messageEvent(event: MessageEvent) {
    const data = event.data
    if (data.sso_id) {
      setMe({ ...me(), sso_id: data.sso_id })
      saveMe(true)
    }
  }
  window.addEventListener("message", messageEvent)
  onCleanup(() => {
    window.removeEventListener("message", messageEvent)
  })
  return (
    <VStack w="$full" spacing="$4" alignItems="start">
      1
    </VStack>
  )
}

export default Profile
