<template>
    <div
        class="column fit"
        v-touch-pan.right.mouse.prevent="handleDrawerTouchPan"
    >
        <!-- ensure wallets is loaded -->
        <template v-if="wallets">
            <page-toolbar
                :title="title"
                icon="menu"
                :gid="wallet && wallet.gid"
                @action="drawerOpen=true"
            >
                <q-btn
                    v-if="wallet"
                    class="q-ml-auto"
                    flat
                    round
                    icon="more_horiz"
                >
                    <option-menu :wallet="wallet" />
                </q-btn>
            </page-toolbar>
            <!-- tips -->
            <div class="narrow-page q-mx-auto bannerMt">
                <upgrade-tip v-if="$state.app.updateAvailable" />
                <backup-tip
                    v-for="w in wallets"
                    :key="w.id"
                    @backup="$router.push({name: 'backup', params: {walletId: w.id.toString()}})"
                    v-show="w.id === selectedWalletId && !w.meta.backedUp"
                />
            </div>
            <!-- address list -->
            <address-card-list
                v-if="wallet"
                ref="list"
                :wallet="wallet"
                class="col address-list"
            />
            <div
                v-else
                class="narrow-page q-my-auto text-center self-center"
            >
                <p class="text-grey text-h5 text-center col-12">{{$t('common.no_wallet')}}</p>
                <q-btn
                    unelevated
                    color="primary"
                    class="w40 themeBtn"
                    :label="$t('index.action_create')"
                    :to="{name: 'new-wallet'}"
                />
            </div>
            <!-- the drawer -->
            <side-drawer
                v-model="drawerOpen"
                ref="drawer"
            >
                <drawer-panel>
                    <wallet-list
                        :current="selectedWalletId"
                        :wallets="wallets"
                        @select="onSelectWallet($event)"
                    />
                </drawer-panel>
            </side-drawer>
        </template>
    </div>
</template>
<script lang="ts">
import Vue from 'vue'
import BackupTip from './BackupTip.vue'
import UpgradeTip from './UpgradeTip.vue'
import DrawerPanel from './DrawerPanel.vue'
import WalletList from './WalletList.vue'
import AddressCardList from './AddressCardList.vue'
import OptionMenu from './OptionMenu.vue'
import SideDrawer from 'components/SideDrawer.vue'
import PageToolbar from 'components/PageToolbar.vue'
import { scroll } from 'quasar'

const SELECTED_WALLET_ID_KEY = 'selectedWalletId'

export default Vue.extend({
    components: { BackupTip, UpgradeTip, DrawerPanel, WalletList, AddressCardList, OptionMenu, SideDrawer, PageToolbar },
    data: () => {
        return {
            drawerOpen: false,
            selectedWalletId: parseInt(localStorage.getItem(SELECTED_WALLET_ID_KEY) || '0')
        }
    },
    computed: {
        wallet(): M.Wallet | null {
            return this.wallets ? this.wallets.find(w => w.id === this.selectedWalletId) || this.wallets[0] || null
                : null
        },
        title(): string {
            return (this.wallet && this.wallet.meta.name) || 'Metamuto'
        }
    },
    asyncComputed: {
        wallets(): Promise<M.Wallet[] | null> {
            return this.$svc.wallet.all()
        }
    },
    watch: {
        selectedWalletId(newVal: number) {
            // remember the selected wallet
            localStorage.setItem(SELECTED_WALLET_ID_KEY, newVal.toString())
            const list = this.$refs.list as Vue
            list && list.$el.scrollTo({ top: 0, behavior: 'auto' })
        },
        wallet(newVal: M.Wallet | null, oldVal: M.Wallet | null) {
            if (newVal && oldVal &&
                newVal.id === oldVal.id &&
                newVal.meta.addresses.length !== oldVal.meta.addresses.length) {
                // new address added, and scroll to the end
                const list = this.$refs.list as Vue
                list && scroll.setScrollPosition(list.$el, list.$el.scrollHeight, 500)
            }
        },
        wallets(newVal: M.Wallet[] | null, oldVal: M.Wallet[] | null) {
            if (newVal && newVal.length > 0 && !newVal.find(w => w.id === this.selectedWalletId)) {
                // none selected, select the first one
                this.selectedWalletId = newVal[0].id
                return
            }

            if (newVal && oldVal && newVal.length === oldVal.length + 1) {
                // new wallet created, find out and select it
                for (const { id } of newVal) {
                    if (!oldVal.find(w => w.id === id)) {
                        this.selectedWalletId = id
                        break
                    }
                }
            }
        }
    },
    methods: {
        handleDrawerTouchPan(ev: Record<string, unknown>) {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (this.$refs.drawer as any).handleTouchPanExternal(ev)
        },
        onSelectWallet(id: number) {
            this.drawerOpen = false
            this.selectedWalletId = id
        }
    }
})
</script>
<style scoped>
body.q-ios-padding .address-list {
    margin-bottom: calc(-1 * env(safe-area-inset-bottom));
}
</style>
