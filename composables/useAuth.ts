import type { TwitchUser } from "~/server/types/types"

export const useAuth = () => {
  const user = useState<TwitchUser | null>('user', () => null);
  const isAuthenticated = computed(() => !!useCookie('session').value)
  
  const logout = () => {
    user.value = null;
    useCookie('session').value = null;
    navigateTo('/login');
  }

  const getUser = async () => {
    if (!isAuthenticated.value) return null;

    try {
      const data = await $fetch('/api/auth/user')
      user.value = data as TwitchUser;
      return user.value;
    } catch (error) {
      logout();
      return null;
    }
  }

  return { user, isAuthenticated, logout, getUser}
}