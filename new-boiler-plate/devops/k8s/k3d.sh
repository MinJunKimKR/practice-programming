
# k3d, kubectl are must installed
RELATIVE_DIR=`dirname "$BASH_SOURCE"`
cd $RELATIVE_DIR

K3D_PATH=`pwd -P`
k3d cluster create ateam --registry-config "$K3D_PATH/registries.yaml"
k3d kubeconfig merge ateam --kubeconfig-switch-context
kubectl get nodes
k3d-ateam-server-0